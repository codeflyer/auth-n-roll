import {
  RESEND_VALIDATION_CODE_STATE_NOT_REQUESTED,
  RESEND_VALIDATION_CODE_STATE_SENDING,
  RESEND_VALIDATION_CODE_STATE_SENDING_ERROR,
  RESEND_VALIDATION_CODE_STATE_SENDING_SUCCESS
} from '../constants'
import { getAuthService } from './selectors'

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

async function resendValidationCode() {
  this.updateState({
    resendValidationCodeState: Object.assign({}, this.state.resendCode, {
      sendingState: RESEND_VALIDATION_CODE_STATE_SENDING,
      error: null
    })
  })

  try {
    await getAuthService(this.state).resendValidationCode(this.state.user.username)
    this.updateState({
      resendValidationCodeState: Object.assign({}, this.state.resendCode, {
        sendingState: RESEND_VALIDATION_CODE_STATE_SENDING_SUCCESS
      })
    })
  } catch (e) {
    this.updateState({
      resendValidationCodeState: Object.assign({}, this.state.resendCode, {
        sendingState: RESEND_VALIDATION_CODE_STATE_SENDING_ERROR,
        error: e.message
      })
    })
  }
}

export const getResendValidationCodeSendingState = state =>
  state.resendValidationCodeState.sendingState

export const getResendValidationCodeSendingError = state =>
  state.resendValidationCodeState.error || {}
