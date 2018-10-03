import {
  USERNAME_EXISTS_ERROR,
  NOT_AUTHORIZED_ERROR,
  INVALID_PASSWORD_ERROR
} from 'auth-n-roll'

import { delay, getState } from './index'

export const SignUp = async (options) => {
  const {username, password} = options
  console.log('SignUp: ', options)
  await delay(1000)

  switch (getState('signupResponse')) {
    case USERNAME_EXISTS_ERROR:
      throw {
        code: USERNAME_EXISTS_ERROR,
        message: 'USERNAME_EXISTS_ERROR',
        user: { username }
      }

    case NOT_AUTHORIZED_ERROR:
      throw {
        code: NOT_AUTHORIZED_ERROR,
        message: 'NOT_AUTHORIZED_ERROR',
        user: { username }
      }

    case INVALID_PASSWORD_ERROR:
      throw {
        code: INVALID_PASSWORD_ERROR,
        message: 'INVALID_PASSWORD_ERROR',
        user: { username: username }
      }

    default:
      return {
        CodeDeliveryDetails: {
          AttributeName: 'some-name',
          DeliveryMedium: 'EMAIL',
          Destination: 'davide@codeflyer.com'
        },
        UserConfirmed: false,
        UserSub: '1234-1234-1234'
      }
  }
}
