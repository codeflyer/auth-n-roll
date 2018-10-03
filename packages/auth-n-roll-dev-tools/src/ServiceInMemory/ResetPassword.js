import { RESET_PASSWORD_ERROR } from 'auth-n-roll'

import { delay, getState } from './index'

export const ResetPassword = async options => {
  const { username, email } = options
  console.log('SignUp: ', options)

  await delay(500)
  switch (getState('resetPassword')) {
    case RESET_PASSWORD_ERROR:
      throw {
        code: RESET_PASSWORD_ERROR,
        message: 'Error on sending password',
        user: { username }
      }
    default:
      return {
        result: 'OK'
      }
  }
}
