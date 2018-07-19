import 'whatwg-fetch'
import { RESPONSE_SUCCESS, GENERIC_ERROR } from 'auth-n-roll'

import { ServiceCognito } from '../src'

import stack from '../../../data/stack'

describe('ResendConfirmationCode', () => {
  test('The confirmation code was already sent', async () => {
    const service = ServiceCognito(stack)
    try {
      const result = await service.resendConfirmationCode(
        'davide@codeflyer.com'
      )
      expect(true).toBeFalsy()
    } catch (e) {
      try {
        expect(e).toEqual({
          code: 'GENERIC_ERROR',
          message: "Can't resend confirmation code for this user",
          originalCode: 'NotAuthorizedException',
          user: { username: 'davide@codeflyer.com' }
        })
      } catch (err) {
        expect(e).toEqual({
          code: 'GENERIC_ERROR',
          message: 'Attempt limit exceeded, please try after some time.',
          originalCode: 'LimitExceededException',
          user: { username: 'davide@codeflyer.com' }
        })
      }
    }
  })
})
