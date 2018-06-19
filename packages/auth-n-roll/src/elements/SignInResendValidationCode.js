import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'

import { StateContext, withAuthNRoll2, withAuthNRoll } from '../contexts'
import { StateFilter } from '../consumers/StateFilter'
import {
  RESEND_VALIDATION_CODE_STATE_SENDING,
  RESEND_VALIDATION_CODE_STATE_SENDING_ERROR,
  RESEND_VALIDATION_CODE_STATE_SENDING_SUCCESS
} from '../constants'

export const SignInResendValidationCode = ({children})=> <React.Fragment>{children}</React.Fragment>

SignInResendValidationCode.MessageSending = ({ children }) => (
  <StateFilter
    name="resendCode.sendingState"
    value={RESEND_VALIDATION_CODE_STATE_SENDING}
  >
    {' '}
    {children}{' '}
  </StateFilter>
)

SignInResendValidationCode.MessageSendingSuccess = ({ children }) => (
  <StateFilter
    name="resendCode.sendingState"
    value={RESEND_VALIDATION_CODE_STATE_SENDING_SUCCESS}
  >
    {children}
  </StateFilter>
)

SignInResendValidationCode.MessageSendingError = ({ children }) => (
  <StateFilter
    name="resendCode.sendingState"
    value={RESEND_VALIDATION_CODE_STATE_SENDING_ERROR}
  >
    {children}
  </StateFilter>
)

SignInResendValidationCode.ResendButton = withAuthNRoll(props => {
  const resentCode = get(props, 'authNRoll.resendCode', {})
  return (
    <React.Fragment>
      {React.Children.map(props.children, child =>
        React.cloneElement(child, {
          onClick: resentCode.resend,
          disabled: resentCode.sendingState === RESEND_VALIDATION_CODE_STATE_SENDING
        })
      )}
    </React.Fragment>
  )
})

SignInResendValidationCode.propTypesDefinition = PropTypes.shape({
  user: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    fullname: PropTypes.string
  }).isRequired,
  sendingState: PropTypes.oneOf([
    SignInResendValidationCode.STATE_NOT_REQUESTED,
    SignInResendValidationCode.STATE_SENDING,
    SignInResendValidationCode.STATE_SENDING_ERROR,
    SignInResendValidationCode.STATE_SENDING_SUCCESS
  ]),
  error: PropTypes.string,
  resend: PropTypes.func.isRequired
})
