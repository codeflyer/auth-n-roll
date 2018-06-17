import 'whatwg-fetch'
import {
  SIGN_IN_RESPONSE_NOT_AUTHORIZED,
  SIGN_IN_RESPONSE_NOT_CONFIRMED,
  SIGN_IN_RESPONSE_USER_NOT_FOUND,
  SIGN_IN_RESPONSE_VALIDATION_DATA
} from 'auth-n-roll'

import { ServiceCognito } from '../src'

import stack from '../../../data/stack'

describe('ResendConfirmationCode', () => {
  test.only('The confirmation code was already sent', async () => {
    const service = ServiceCognito(stack)
    expect.assertions(1)
    try {
      const result = await service.resendConfirmationCode('davide@codeflyer.com')
    } catch (e) {
      expect(e).toEqual({
        code: SIGN_IN_RESPONSE_VALIDATION_DATA,
        message: 'Username and password required'
      })
    }
  })
})
