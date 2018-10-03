import {
  RESPONSE_SUCCESS
} from 'auth-n-roll'

import { SignIn } from './SignIn'
import { SignUp } from './SignUp'
import { ResetPassword } from './ResetPassword'
import { Refresh } from './Refresh'
import { ResendConfirmationCode } from './ResendValidationCode'
import { ConfirmSignUp } from './ConfirmSignUp'
import { ChangePasswordForced } from './ChangePasswordForced'
import { SendUsername } from './SendUsername'

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
  const stored = window.localStorage.getItem(STORAGE_KEY)
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
  }

  return {
    signOut: () => {
      console.log('In memory signout') // eslint-disable-line
    },
    signUp: SignUp,
    resetPassword: ResetPassword,
    signIn: SignIn,
    refresh: Refresh,
    resendConfirmationCode: ResendConfirmationCode,
    confirmSignUp: ConfirmSignUp,
    changePasswordForced: ChangePasswordForced,
    sendUsername: SendUsername,
    getLoggedUser
  }
}
