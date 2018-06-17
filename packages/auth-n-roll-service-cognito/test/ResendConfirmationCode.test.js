import 'whatwg-fetch'
import {
  RESEND_VALIDATION_CODE_RESPONSE_OK,
  RESEND_VALIDATION_CODE_RESPONSE_ERROR
} from 'auth-n-roll'

import { ServiceCognito } from '../src'

import stack from '../../../data/stack'

describe('ResendConfirmationCode', () => {
  test('The confirmation code was already sent', async () => {
    const service = ServiceCognito(stack)
    expect.assertions(1)
    try {
      const result = await service.resendConfirmationCode(
        'davide@codeflyer.com'
      )
    } catch (e) {
      expect(e).toEqual({
        code: 'RESEND_VALIDATION_CODE_RESPONSE_ERROR',
        message: "Can't resend confirmation code for this user",
        originalCode: 'NotAuthorizedException',
        user: { username: 'davide@codeflyer.com' }
      })
    }
  })
})
