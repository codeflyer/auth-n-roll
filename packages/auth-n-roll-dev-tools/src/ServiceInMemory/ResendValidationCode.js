import { delay, getState } from './index'

import {
  GENERIC_ERROR
} from 'auth-n-roll'

export const ResendValidationCode = async username => {
  await delay(500)
  switch (getState('resendValidationCodeResponse')) {
    case GENERIC_ERROR:
      throw {
        code: GENERIC_ERROR,
        message: 'Email already verifyed',
        user: { username }
      }
    default:
      return {
        result: 'OK'
      }
  }
}
