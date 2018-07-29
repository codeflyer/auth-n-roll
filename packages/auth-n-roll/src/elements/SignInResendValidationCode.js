import React from 'react'

import { withAuthNRoll } from '../contexts'
import { StateFilter } from '../consumers/StateFilter'
import {
  RESEND_VALIDATION_CODE_STATE_SENDING,
  RESEND_VALIDATION_CODE_STATE_SENDING_ERROR,
  RESEND_VALIDATION_CODE_STATE_SENDING_SUCCESS
} from '../constants'

import { getResendValidationCodeSendingState, getUser, getResendValidationCodeSendingError } from '../store/selectors'

export const SignInResendValidationCode = ({children})=> <React.Fragment>{children}</React.Fragment>

SignInResendValidationCode.ErrorMessage = withAuthNRoll(({ authNRoll }) => {
  return (
    <React.Fragment>{getResendValidationCodeSendingError(authNRoll) || ''}</React.Fragment>
  )
})

SignInResendValidationCode.MessageSending = ({ children }) => (
  <StateFilter
    getStateFunction={getResendValidationCodeSendingState}
    value={RESEND_VALIDATION_CODE_STATE_SENDING}
  >{children}</StateFilter>
)

SignInResendValidationCode.MessageSendingSuccess = ({ children }) => (
  <StateFilter
    getStateFunction={getResendValidationCodeSendingState}
    value={RESEND_VALIDATION_CODE_STATE_SENDING_SUCCESS}
  >{children}</StateFilter>
)

SignInResendValidationCode.MessageSendingError = ({ children }) => (
  <StateFilter
    getStateFunction={getResendValidationCodeSendingState}
    value={RESEND_VALIDATION_CODE_STATE_SENDING_ERROR}
  >{children}</StateFilter>
)

SignInResendValidationCode.ResendButton = withAuthNRoll(props => {
  return (
    <React.Fragment>
      {React.Children.map(props.children, child =>
        React.cloneElement(child, {
          onClick: props.authNRollActions.resendValidationCode.bind(null, props.signUp),
          disabled: getResendValidationCodeSendingState(props.authNRoll) === RESEND_VALIDATION_CODE_STATE_SENDING
        })
      )}
    </React.Fragment>
  )
})
