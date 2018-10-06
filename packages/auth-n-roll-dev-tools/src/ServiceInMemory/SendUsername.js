/* eslint-disable no-console */
import { SEND_USERNAME_ERROR } from 'auth-n-roll'

import { delay, getState } from './index'

export const SendUsername = async (options) => {
  const { email } = options
  console.log('Send Username: ', options)

  await delay(500)
  switch (getState('resendUsername')) {
    case SEND_USERNAME_ERROR:
      throw {
        code: SEND_USERNAME_ERROR,
        message: 'Error on sending username',
        user: { email }
      }
    default:
      return {
        result: 'OK'
      }
  }
}
