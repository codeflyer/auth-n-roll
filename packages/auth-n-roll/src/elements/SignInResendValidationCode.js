import React from 'react'
import PropTypes from 'prop-types'

import {
  RESEND_VALIDATION_CODE_RESPONSE_NOT_REQUESTED,
  RESEND_VALIDATION_CODE_RESPONSE_SENDING,
  RESEND_VALIDATION_CODE_RESPONSE_SENDING_ERROR,
  RESEND_VALIDATION_CODE_RESPONSE_SENDING_SUCCESS
} from '../constants'

import { StateContext, withAuthNRoll2 } from '../contexts'
import { StateFilter } from '../consumers/StateFilter'

export const SignInResendValidationCodeBase = Component => {
  return class extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        sendingState: RESEND_VALIDATION_CODE_RESPONSE_NOT_REQUESTED,
        error: null,
        user: this.props.authNRoll.user,
        resend: this.handleResend.bind(this)
      }
    }

    async handleResend() {
      this.setState({
        sendingState: RESEND_VALIDATION_CODE_RESPONSE_SENDING,
        error: null
      })

      try {
        await this.props.authNRoll.authService.resendValidationCode(
          this.state.user.username
        )
        this.setState({
          sendingState: RESEND_VALIDATION_CODE_RESPONSE_SENDING_SUCCESS
        })
      } catch (e) {
        this.setState({
          sendingState: RESEND_VALIDATION_CODE_RESPONSE_SENDING_ERROR,
          error: e.message
        })
      }
    }

    render() {
      return (
        <StateContext.Provider value={this.state}>
          <Component {...this.state}>{this.props.children}</Component>
        </StateContext.Provider>
      )
    }
  }
}

export const SignInResendValidationCode  = withAuthNRoll2(SignInResendValidationCodeBase)

SignInResendValidationCode.MessageSending = ({ children }) => (
  <StateFilter
    name="sendingState"
    value={RESEND_VALIDATION_CODE_RESPONSE_SENDING}
  >
    {' '}
    {children}{' '}
  </StateFilter>
)

SignInResendValidationCode.MessageSendingSuccess = ({ children }) => (
  <StateFilter
    name="sendingState"
    value={RESEND_VALIDATION_CODE_RESPONSE_SENDING_SUCCESS}
  >
    {children}
  </StateFilter>
)

SignInResendValidationCode.MessageSendingError = ({ children }) => (
  <StateFilter
    name="sendingState"
    value={RESEND_VALIDATION_CODE_RESPONSE_SENDING_ERROR}
  >
    {children}
  </StateFilter>
)

SignInResendValidationCode.ResendButton = props => (
  <StateContext.Consumer>
    {state => (
      <React.Fragment>
        {React.Children.map(props.children, child =>
          React.cloneElement(child, {
            onClick: state.resend,
            disabled:
              state.sendingState === RESEND_VALIDATION_CODE_RESPONSE_SENDING
          })
        )}
      </React.Fragment>
    )}
  </StateContext.Consumer>
)

SignInResendValidationCode.propTypesDefinition = PropTypes.shape({
  user: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    fullname: PropTypes.string
  }).isRequired,
  sendingState: PropTypes.oneOf([
    RESEND_VALIDATION_CODE_RESPONSE_NOT_REQUESTED,
    RESEND_VALIDATION_CODE_RESPONSE_SENDING,
    RESEND_VALIDATION_CODE_RESPONSE_SENDING_SUCCESS,
    RESEND_VALIDATION_CODE_RESPONSE_SENDING_ERROR
  ]),
  error: PropTypes.string,
  resend: PropTypes.func.isRequired
})
