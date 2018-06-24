import 'whatwg-fetch'
import {
  NOT_AUTHORIZED_ERROR,
  USER_NOT_CONFIRMED_ERROR,
  USER_NOT_FOUND_ERROR,
  VALIDATION_DATA_ERROR
} from 'auth-n-roll'

import { ServiceCognito } from '../src'

import stack from '../../../data/stack'

describe('SignIn', () => {
  test('Username and password not set', async () => {
    const service = ServiceCognito(stack)
    expect.assertions(1)
    try {
      await service.signIn()
    } catch (e) {
      expect(e).toEqual({
        code: VALIDATION_DATA_ERROR,
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
        code: VALIDATION_DATA_ERROR,
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
        code: USER_NOT_FOUND_ERROR,
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
        code: NOT_AUTHORIZED_ERROR,
        message: 'Incorrect username or password.',
        user: { username: 'davide@codeflyer.com' }
      })
    }
  })

  test('Right credential but Password should be changed', async () => {
    const service = ServiceCognito(stack)
    const result = await service.signIn('davide@codeflyer.com', 'testTEST1234')
    expect(result.challenge.ChallengeName).toEqual('NEW_PASSWORD_REQUIRED')
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
        code: USER_NOT_CONFIRMED_ERROR,
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
    expect(result.authData.AccessToken).toBeDefined()
    expect(result.authData.IdToken).toBeDefined()
    expect(result.authData.RefreshToken).toBeDefined()
    expect(result.authData.ExpiresIn).toBe(3600)
    expect(result.authData.TokenType).toBe('Bearer')
    expect(result.user).toEqual({ username: 'davide.fiorello@nearform.com' })
  })
})
