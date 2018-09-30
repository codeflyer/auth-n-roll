import {
  GENERIC_ERROR
} from 'auth-n-roll'

import { delay, getState } from './index'

export const ResetPassword = async username => {
  await delay(500)
  switch (getState('resetPassword')) {
    case GENERIC_ERROR:
      throw {
        code: GENERIC_ERROR,
        message: 'Error on sending password',
        user: { username }
      }
    default:
      return {
        result: 'OK'
      }
  }
}
