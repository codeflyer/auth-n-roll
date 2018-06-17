import 'whatwg-fetch'
import { ServiceCognito } from '../src/index'
import stack from '../../../data/stack'
import {
  SIGN_IN_RESPONSE_NOT_AUTHORIZED,
  SIGN_IN_RESPONSE_NOT_CONFIRMED,
  SIGN_IN_RESPONSE_USER_NOT_FOUND,
  SIGN_IN_RESPONSE_VALIDATION_DATA
} from '../src'

describe('Cognit service', () => {
  test('Username and password not set', async () => {
    const service = ServiceCognito(stack)
    expect.assertions(1)
    try {
      await service.signIn()
    } catch (e) {
      expect(e).toEqual({
        code: SIGN_IN_RESPONSE_VALIDATION_DATA,
        message: 'Username and password required'
      })
    }
  })

  test('Password not set', async () => {
    const service = ServiceCognito(stack)
    try {
      expect.assertions(1)
      await service.signIn('davide@codeflyer.com')
    } catch (e) {
      expect(e).toEqual({
        code: SIGN_IN_RESPONSE_VALIDATION_DATA,
        message: 'Username and password required'
      })
    }
  })

  test('Wrong Username and password', async () => {
    const service = ServiceCognito(stack)
    expect.assertions(1)
    try {
      await service.signIn('some@test.it', 'somepassword')
    } catch (e) {
      expect(e).toEqual({
        code: SIGN_IN_RESPONSE_USER_NOT_FOUND,
        message: 'User does not exist.',
        user: { username: 'some@test.it' }
      })
    }
  })

  test('Wrong Password', async () => {
    const service = ServiceCognito(stack)
    expect.assertions(1)
    try {
      await service.signIn('davide@codeflyer.com', 'somepassword')
    } catch (e) {
      expect(e).toEqual({
        code: SIGN_IN_RESPONSE_NOT_AUTHORIZED,
        message: 'Incorrect username or password.',
        user: { username: 'davide@codeflyer.com' }
      })
    }
  })

  test.only('Right credential but Password should be changed', async () => {
    const service = ServiceCognito(stack)
    const result = await service.signIn('davide@codeflyer.com', 'testTEST1234')
    expect(result.ChallengeName).toEqual('NEW_PASSWORD_REQUIRED')
    expect(result.user).toEqual({ username: 'davide@codeflyer.com' })
  })

  test('Right credential but not confirmed', async () => {
    const service = ServiceCognito(stack)
    expect.assertions(1)
    try {
      const result = await service.signIn(
        'davide.fiorello@gmail.com',
        'testTEST1234'
      )
    } catch (e) {
      expect(e).toEqual({
        code: SIGN_IN_RESPONSE_NOT_CONFIRMED,
        message: 'User is not confirmed.',
        user: { username: 'davide.fiorello@gmail.com' }
      })
    }
  })

  test('Right credential', async () => {
    const service = ServiceCognito(stack)
    const result = await service.signIn(
      'davide.fiorello@nearform.com',
      '1234TESTtest'
    )
    expect(result.AuthenticationResult.AccessToken).toBeDefined()
    expect(result.AuthenticationResult.IdToken).toBeDefined()
    expect(result.AuthenticationResult.RefreshToken).toBeDefined()
    expect(result.AuthenticationResult.ExpiresIn).toBe(3600)
    expect(result.AuthenticationResult.TokenType).toBe('Bearer')
    expect(result.user).toEqual({ username: 'davide.fiorello@nearform.com' })
  })
})
