import { delay, getState } from './index'
import {
  USERNAME_EXISTS_ERROR,
  NOT_AUTHORIZED_ERROR,
  INVALID_PASSWORD_ERROR
} from 'auth-n-roll'

export const SignUp = async (username, password) => {
  await delay(1000)

  switch (getState('signupResponse')) {
    case USERNAME_EXISTS_ERROR:
      throw {
        code: USERNAME_EXISTS_ERROR,
        message: 'SIGNUP_USERNAME_EXISTS_ERROR',
        user: { username }
      }

    case NOT_AUTHORIZED_ERROR:
      throw {
        code: NOT_AUTHORIZED_ERROR,
        message: 'SIGNUP_NOT_AUTHORIZED_ERROR',
        user: { username }
      }

    case INVALID_PASSWORD_ERROR:
      throw {
        code: INVALID_PASSWORD_ERROR,
        message: 'SIGNUP_INVALID_PASSWORD_ERROR',
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