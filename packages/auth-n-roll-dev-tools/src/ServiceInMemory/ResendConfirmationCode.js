/* eslint-disable no-console */
import {
  GENERIC_ERROR
} from 'auth-n-roll'

import { delay, getState } from './index'

export const ResendConfirmationCode = async (options) => {
  const {username} = options
  console.log('ResendValidationCode: ', options)

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
