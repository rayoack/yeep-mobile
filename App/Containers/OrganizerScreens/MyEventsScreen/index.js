import React from 'react'
import { Platform } from 'react-native'
import { connect } from 'react-redux'
import { parseISO, isBefore, isAfter } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { Images, Colors } from 'App/Theme'
import { translate } from '../../../Locales'
import api from '../../../Services/api'
import { Header } from '../../../Components'

import { CreateEventButton } from './styles'
import ViewComponent from './ViewComponents'

class MyEventsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      events: [],
      pastEvents: [],
      noDate: [],
      page: 1,
    }
  }

  componentDidMount = () => {
    this.loadMyEvents()
  }

  redirectToLoginScreen = () => {
    this.props.navigation.navigate('LoginScreen')
  }

  loadMyEvents = async () => {
    const { page, noDate, events, pastEvents } = this.state

    this.setState({ loading: true })

    try {
      const { data } = await api.get(`/myEvents/${page}`, {}, {
        authorization: `Bearer ${this.props.user.token}`
      })

      let eventsList = []
      let pastEventsList = []
      
      const noDateList = data.filter(event => event.dates.length == 0)
      const eventsWithDate = data.filter(event => event.dates.length)

      if(eventsWithDate.length) {
        eventsList = eventsWithDate.filter(event => isBefore(new Date(), parseISO(event.dates[0].full_date)))
        pastEventsList = eventsWithDate.filter(event => isAfter(new Date(), parseISO(event.dates[0].full_date)))
      }
      
      this.setState({
        noDate: [...noDate, ...noDateList],
        events: [...events, ...eventsList],
        pastEvents: [...pastEvents, ...pastEventsList],
        loading: false
      })

    } catch (error) {
      this.setState({ loading: false })
      console.log({error})

      if(error.response.status == 401) {
        this.redirectToLoginScreen()
      }
    }
  }

  navigateToEventDetails = (eventId) => {
    this.props.navigation.navigate('EventDetailsScreen', {
      event_id: eventId
    })
  }

  render() {
    const { loading, events, pastEvents, noDate } = this.state
    
    return (
      <>
        <Header />

        <CreateEventButton>
          <Icon size={40} name="plus" color={Colors.white} />
        </CreateEventButton>

        <ViewComponent
          events={events}
          pastEvents={pastEvents}
          noDate={noDate}
          loading={loading}
          translate={translate}
          navigateToEventDetails={this.navigateToEventDetails}
        />
      </>
    )
  }

}

MyEventsScreen.propTypes = {
}

const mapStateToProps = (state) => ({
  user: state.auth.user
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyEventsScreen)
