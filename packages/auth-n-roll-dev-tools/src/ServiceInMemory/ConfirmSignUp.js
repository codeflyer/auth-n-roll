import { delay, getState } from './index'

import {
  SIGN_IN_RESPONSE_VALIDATION_DATA,
  CONFIRM_SIGN_UP_USER_NOT_FOUND,
  CONFIRM_SIGN_UP_CODE_MISMATCH,
  CONFIRM_SIGN_UP_EXPIRED_CODE
} from 'auth-n-roll'

export const ConfirmSignUp = async (username, confirmationCode) => {
  if (!confirmationCode || !username) {
    throw {
      code: SIGN_IN_RESPONSE_VALIDATION_DATA,
      message: 'Username and ConfirmationCode required'
    }
  }

  await delay(1000)

  switch (getState('confirmSignUpResponse')) {
    case CONFIRM_SIGN_UP_CODE_MISMATCH:
      throw {
        code: CONFIRM_SIGN_UP_CODE_MISMATCH,
        message: 'Code not valid',
        user: { username }
      }
    case CONFIRM_SIGN_UP_USER_NOT_FOUND:
      throw {
        code: CONFIRM_SIGN_UP_USER_NOT_FOUND,
        message: 'User not found',
        user: { username }
      }
    case CONFIRM_SIGN_UP_EXPIRED_CODE:
      throw {
        code: CONFIRM_SIGN_UP_EXPIRED_CODE,
        message: 'Expired code',
        user: { username }
      }
    default:
      return {}
  }
}
