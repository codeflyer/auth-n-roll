/* eslint-disable no-console */
import {
  VALIDATION_DATA_ERROR,
  USER_NOT_FOUND_ERROR,
  VALIDATION_CODE_MISMATCH_ERROR,
  EXPIRED_VALIDATION_CODE_ERROR,
  GENERIC_ERROR
} from 'auth-n-roll'

import { delay, getState } from './index'

export const ConfirmSignUp = async (options) => {
  const {username, confirmationCode} = options
  console.log('ConfirmSignUp: ', options)

  if (!confirmationCode || !username) {
    throw {
      code: VALIDATION_DATA_ERROR,
      message: 'Username and ConfirmationCode required'
    }
  }

  await delay(1000)

  switch (getState('confirmSignUpResponse')) {
    case VALIDATION_CODE_MISMATCH_ERROR:
      throw {
        code: VALIDATION_CODE_MISMATCH_ERROR,
        message: 'Code not valid',
        user: { username }
      }
    case USER_NOT_FOUND_ERROR:
      throw {
        code: USER_NOT_FOUND_ERROR,
        message: 'User not found',
        user: { username }
      }
    case EXPIRED_VALIDATION_CODE_ERROR:
      throw {
        code: EXPIRED_VALIDATION_CODE_ERROR,
        message: 'Expired code',
        user: { username }
      }
    case GENERIC_ERROR:
      throw {
        code: GENERIC_ERROR,
        message: 'Not managed error',
        user: { username }
      }
    default:
      return {}
  }
}
