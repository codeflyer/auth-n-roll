import 'whatwg-fetch'
import {
  RESEND_VALIDATION_CODE_RESPONSE_OK,
  RESEND_VALIDATION_CODE_RESPONSE_ERROR
} from 'auth-n-roll'

import { ServiceCognito } from '../src'

import stack from '../../../data/stack'

describe('ConfirmSignUp', () => {
  test('The use is not in the unconfirmed state', async () => {
    const service = ServiceCognito(stack)
    expect.assertions(1)
    try {
      await service.confirmSignUp(
        'davide@codeflyer.com',
        '12345'
      )
    } catch (e) {
      expect(e).toEqual({
        code: 'CONFIRM_SIGN_UP_ERROR',
        message: 'User cannot confirm because user status is not UNCONFIRMED.',
        originalCode: 'NotAuthorizedException',
        user: { username: 'davide@codeflyer.com' }
      })
    }
  })
})
