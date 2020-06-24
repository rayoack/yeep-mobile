import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import LinearGradient from 'react-native-linear-gradient';

import {
  AnimationLoading,
  CustomToast
} from '../../Components'

import BaseURL from '../../Config/BaseURL'
import api from '../../Services/api'
import { Images, Colors } from 'App/Theme'
import { translate } from '../../Locales'

export class RoomChat extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      messages: [],
      users: [],
      refreshing: false,
      toastText: '',
      showToast: false,
      room_id: null
    }

  }
  
  componentDidMount = () => {
    const room_id = this.props.navigation.getParam('room_id', null)

    this.socket = io(BaseURL.api,
      {
        forceNode: true,
        query: {
          user_id: this.props.user.id
        }
      }
    )

    this.socket.emit('joinRoom', `reserve${room_id}`)

    this.socket.on('message', msg => {
      console.log('I received a private message by: ', msg);
      this.insertNewMessage(msg)
    });

    this.setState({
      room_id
    }, () => this.loadMessages())
  }

  componentWillUnmount = () => {
    this.socket.emit('leavesRoom', `reserve${this.state.room_id}`)
  }

  loadMessages = async () => {
    this.setState({ loading: true })
    console.log(this.state.room_id)

    try {
      const { data } = await api.get(`/messages/${this.state.room_id}`, {}, {
        authorization: `Bearer ${this.props.user.token}`
      })

      const mappedMessages = this.mapMessages(data)

      this.setState({
        messages: mappedMessages,
        loading: false
      })

    } catch (error) {
      this.setState({ loading: false })
      this.setShowToast(translate('errorOnLoadMessages'))
      console.log({error})
    }
  }

  insertNewMessage = (message) => {
    console.log(message)

    const mappedMessage = {
      _id: message.id,
      text: message.message,
      createdAt: message.createdAt,
      user: {
        _id: message.sender_id,
        name: message.sender_name,
        avatar: message.sender_avatar ? message.sender_avatar : Images.profile_boy
      },
      Image: message.Image
    }

    this.setState(prevState => ({ messages: [...prevState.messages, mappedMessage] }))
  }

  mapMessages = (messages) => {
    
    const mappedMessages = messages.map((msg, index) => {
      if(index == 0) {
        this.setState({ users: [msg.sender.id, msg.receiver.id] })
      }

      return {
        _id: msg.id,
        text: msg.message,
        createdAt: msg.createdAt,
        user: {
          _id: msg.sender.id,
          name: msg.sender.name,
          avatar: msg.sender.avatar ? msg.sender.avatar.url : Images.profile_boy
        },
        Image: msg.Image
      }
    })

    return mappedMessages
  }

  renderBubble = props => {
    return (
      <Bubble
        {...props}
        textStyle={{
          left: {
            color: Colors.text,
          },
          right: {
            color: 'white',
          },
        }}
        wrapperStyle={{
          left: {
            backgroundColor: Colors.ligthGray,
          },
          right: {
            backgroundColor: Colors.saintBlue,
          },
        }}
      />
    );
  }

  onSend = async (message) => {
    console.log(message)

    let usersCopy = [...this.state.users]
    const receiverUser =  usersCopy.filter(user => user != this.props.user.id)

    const newMessage = {
      message: message[0].text,
      room_id: this.state.room_id,
      sender_id: message[0].user._id,
      receiver_id: receiverUser[0]
    }
    
    try {
      const { data } = await api.post(`/messages`, newMessage, {
        authorization: `Bearer ${this.props.user.token}`
      })

      this.setState({
        messagesInLoading: false
      })

    } catch (error) {
      this.setShowToast(translate('errorOnSendMessage'))
      console.log({error})
    }
  }

  setShowToast = (text) => {
    this.setState({ toastText: text, showToast: true })

    this.interval = setInterval(() => {
      this.setState({ showToast: false })
      clearInterval(this.interval)
    }, 2000);
  }

  render() {
    const { messages, loading, showToast, toastText } = this.state
    return (
      <>        
        <CustomToast
          show={showToast} 
          text={toastText} 
          duration={2000}
          positionValue={50}
        />

        {loading ? (
          <AnimationLoading
            loading={loading}/>
        ) : (
          <GiftedChat
            messages={messages}
            renderUsernameOnMessage={true}
            onSend={messages => this.onSend(messages)}
            renderBubble={this.renderBubble}
            user={{
              _id: this.props.user.id,
              name: this.props.user.name,
              avatar: this.props.user.avatar ? this.props.user.avatar.url : Images.profile_boy
            }}
          />
        )}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomChat)
