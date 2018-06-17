import { delay, getState } from './index'

import {
  RESEND_VALIDATION_CODE_RESPONSE_ERROR
} from 'auth-n-roll'

export const ResendValidationCode = async username => {
  await delay(1000)
  switch (getState('resendValidationCodeResponse')) {
    case RESEND_VALIDATION_CODE_RESPONSE_ERROR:
      throw {
        code: RESEND_VALIDATION_CODE_RESPONSE_ERROR,
        message: 'Email already verifyed',
        user: { username }
      }
    default:
      return {
        result: 'OK'
      }
  }
}
