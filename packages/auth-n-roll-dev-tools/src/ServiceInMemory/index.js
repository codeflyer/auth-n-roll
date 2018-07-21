import {
  RESPONSE_SUCCESS
} from 'auth-n-roll'

import { SignIn } from './SignIn'
import { Refresh } from './Refresh'
import { ResendValidationCode } from './ResendValidationCode'
import { ConfirmSignUp } from './ConfirmSignUp'
import { ChangePasswordForced } from './ChangePasswordForced'

export const delay = time => new Promise(resolve => setTimeout(resolve, time))

let state = {
  signinResponse: RESPONSE_SUCCESS,
  resendValidationCodeResponse: RESPONSE_SUCCESS,
  confirmSignUpResponse: RESPONSE_SUCCESS
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
    return null
    // {
    //    username: 'davide'
    // }
  }

  return {
    signIn: SignIn,
    refresh: Refresh,
    resendValidationCode: ResendValidationCode,
    confirmSignUp: ConfirmSignUp,
    changePasswordForced: ChangePasswordForced,
    getLoggedUser
  }
}
