import get from 'lodash/get'

import {
  RESET_PASSWORD_STATE_NOT_REQUESTED,
  RESET_PASSWORD_STATE_SENDING,
  RESET_PASSWORD_STATE_SENDING_ERROR,
  RESET_PASSWORD_STATE_SENDING_SUCCESS
} from '../constants'

import { getAuthService } from './selectors'

export function getDefaultState() {
  return {
    resetPasswordState: {
      sendingState: RESET_PASSWORD_STATE_NOT_REQUESTED,
      error: null
    }
  }
}

export function getActions(store) {
  return {
    resetPassword: resetPassword.bind(store)
  }
}

async function resetPassword(username) {
  this.updateState({
    resetPasswordState: Object.assign({}, this.state.resendCode, {
      sendingState: RESET_PASSWORD_STATE_SENDING,
      error: null
    })
  })

  try {
    await getAuthService(this.state).resetPassword(username)
    this.updateState({
      resetPasswordState: Object.assign({}, this.state.resendCode, {
        sendingState: RESET_PASSWORD_STATE_SENDING_SUCCESS
      })
    })
  } catch (e) {
    this.updateState({
      resetPasswordState: Object.assign({}, this.state.resendCode, {
        sendingState: RESET_PASSWORD_STATE_SENDING_ERROR,
        error: e.message
      })
    })
  }
}

export const getResetPasswordSendingState = (state) => get(state, 'resetPasswordState.sendingState')

export const getResetPasswordSendingError = (state) => get(state, 'resetPasswordState.error') || {}
