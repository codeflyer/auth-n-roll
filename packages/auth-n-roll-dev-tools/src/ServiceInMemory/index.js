import {
  SIGN_IN_RESPONSE_OK,
  RESEND_VALIDATION_CODE_RESPONSE_OK,
  CONFIRM_SIGN_UP_RESPONSE_OK,
} from 'auth-n-roll'

import { SignIn } from './SignIn'
import { ResendValidationCode } from './ResendValidationCode'
import { ConfirmSignUp } from './ConfirmSignUp'

export const delay = time => new Promise(resolve => setTimeout(resolve, time))

let state = {
  signinResponse: SIGN_IN_RESPONSE_OK,
  resendValidationCodeResponse: RESEND_VALIDATION_CODE_RESPONSE_OK,
  confirmSignUpResponse: CONFIRM_SIGN_UP_RESPONSE_OK
}

const STORAGE_KEY = 'auth-n-roll-dev-state'
const storeState = () => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

const restoreState = () => {
  let stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      state = JSON.parse(stored)
    } catch (e) {}
  }
}

export const setState = (key, value) => {
  state[key] = value
  storeState()
}

export const getState = key => {
  return state[key]
}

export const ServiceInMemory = () => {
  restoreState()

  const getLoggedUser = () => {
    return {
      username: 'davide'
    }
  }

  return {
    signIn: SignIn,
    resendValidationCode: ResendValidationCode,
    confirmSignUp: ConfirmSignUp,
    getLoggedUser
  }
}
