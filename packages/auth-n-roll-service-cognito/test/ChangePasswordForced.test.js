import 'whatwg-fetch'
import {
  NOT_AUTHORIZED_ERROR,
  USER_NOT_CONFIRMED_ERROR,
  USER_NOT_FOUND_ERROR,
  VALIDATION_DATA_ERROR
} from 'auth-n-roll'

import { ServiceCognito } from '../src'

import stack from '../../../data/stack'

describe('ChangePasswordForced', () => {
  test.skip('The password should be correctly changed', async () => {
    const service = ServiceCognito(stack)
    let result = await service.signIn('davide@codeflyer.com', 'testTEST1234')

    result = await service.changePasswordForced(
      'davide@codeflyer.com',
      'Davide12345',
      result.challenge.Session
    )
    expect(result.authData.IdToken).toBeDefined()
    expect(result.authData.RefreshToken).toBeDefined()
    expect(result.authData.TokenType).toBe('Bearer')
    expect(result.authData.ExpiresIn).toBe(3600)
    expect(result.authData.AccessToken).toBeDefined()
  })

  test('The password is not conform', async () => {
    const service = ServiceCognito(stack)
    let result = await service.signIn('davide@codeflyer.com', 'testTEST1234')

    expect.assertions(1)
    try {
      result = await service.changePasswordForced(
        'davide@codeflyer.com',
        'davide12345',
        result.challenge.Session
      )
    } catch (e) {
      expect(e).toEqual({
        code: 'INVALID_PASSWORD_ERROR',
        message:
          'Password does not conform to policy: Password must have uppercase characters',
        user: {
          username: 'davide@codeflyer.com'
        }
      })
    }
  })
})
