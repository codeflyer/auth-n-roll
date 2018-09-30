import get from 'lodash/get'

import {
  RESEND_VALIDATION_CODE_STATE_NOT_REQUESTED,
  RESEND_VALIDATION_CODE_STATE_SENDING,
  RESEND_VALIDATION_CODE_STATE_SENDING_ERROR,
  RESEND_VALIDATION_CODE_STATE_SENDING_SUCCESS
} from '../constants'

import { getAuthService, getUser, getSignUpUser } from './selectors'

export function getDefaultState() {
  return {
    resendValidationCodeState: {
      sendingState: RESEND_VALIDATION_CODE_STATE_NOT_REQUESTED,
      error: null
    }
  }
}

export function getActions(store) {
  return {
    resendValidationCode: resendValidationCode.bind(store)
  }
}

async function resendValidationCode(isSignUp) {
  this.updateState({
    resendValidationCodeState: Object.assign({}, {
      sendingState: RESEND_VALIDATION_CODE_STATE_SENDING,
      error: null
    })
  })

  try {
    await getAuthService(this.state).resendValidationCode(
      isSignUp ? getSignUpUser(this.state).username : getUser(this.state).username
    )
    this.updateState({
      resendValidationCodeState: Object.assign({}, {
        sendingState: RESEND_VALIDATION_CODE_STATE_SENDING_SUCCESS
      })
    })
  } catch (e) {
    this.updateState({
      resendValidationCodeState: Object.assign({}, {
        sendingState: RESEND_VALIDATION_CODE_STATE_SENDING_ERROR,
        error: e.message
      })
    })
  }
}

export const getResendValidationCodeSendingState = (state) => get(state, 'resendValidationCodeState.sendingState')

export const getResendValidationCodeSendingError = (state) => get(state, 'resendValidationCodeState.error') || {}
