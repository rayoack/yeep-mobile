import React, { Component } from 'react'
import { StatusBar, BackHandler } from 'react-native'
import { connect } from 'react-redux'
import { Creators as manageEventActions } from '../../../Stores/reducers/manageEventReducer'

import { Images, Colors } from 'App/Theme'
import { translate } from '../../../Locales'

import {
  BackButton,
  CardRegisterStep
} from '../../../Components'

import {
  Container,
  BackButtonContainer,
  EventTitle,
  HeaderContainer
} from './styles'
class EditEventScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      steps: [
        { title: translate('firstEditEventStepTitle'), text: translate('firstEditEventStepText') },
        { title: translate('secondEditEventStepTitle'), text: translate('secondEditEventStepText') },
        { title: translate('thirdEditEventStepTitle'), text: translate('thirdEditEventStepText') },
        { title: translate('fourthEditEventStepTitle'), text: translate('fourthEditEventStepText') },
      ],
      loading: false,
    }
  }

  componentDidMount = () => {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    this.setEventFormData()
  }

  handleBackButton = () => {
    this.props.navigation.goBack()
    return true;
  }

  setEventFormData = () => {
    const event = this.props.navigation.getParam('event')
    
    if(event && event.id) {
      return this.props.setEventFormData(event)
    }

    return null
  }

  navigateToStep = (activeStep) => {
    const { event } = this.props

    if(event.register_step >= activeStep ||
      event.register_step + 1 == activeStep) {
        return this.props.navigation.push('CreationEventSteps', {
          activeStep
        })

      } else {
        return
      }
  }

  render() {
    const { steps } = this.state
    const { event } = this.props

    return (
      <Container>
        <StatusBar translucent={false} backgroundColor="#000" hidden={false}/>

        <HeaderContainer>
          <BackButtonContainer
            onPress={() => this.props.navigation.goBack()}>
            <BackButton color={Colors.white} size={20}/>
          </BackButtonContainer>

          <EventTitle>{event.title}</EventTitle>
        </HeaderContainer>

        {steps.map((step, index) => (
          <CardRegisterStep
            title={step.title}
            text={step.text}
            completed={event.register_step >= index ? true : false}
            final={(steps.length - 1) == index}
            onPress={event.register_step >= index ? () => this.navigateToStep(index) : () => null}
          />
        ))}

      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  event: state.manageEventReducer.event
})

export default connect(
  mapStateToProps,
  { ...manageEventActions }
)(EditEventScreen)
