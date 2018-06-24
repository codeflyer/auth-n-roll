import { Store } from '../../src/store'
import { getSignInError, getChallenge } from '../../src/store/signIn'
import { createStore } from '../helpers/storeMock'

describe('Store/signIn', () => {
  test('Defaults', () => {
    const store = createStore()
    expect(getSignInError(store.state)).toEqual({})
    expect(getChallenge(store.state)).toEqual({})
  })

  test('setSignInError', () => {
    const store = createStore()
    store.actions.setSignInError({code: 10, message: 'err'})
    expect(getSignInError(store.state)).toEqual({code: 10, message: 'err'})
  })

  test('restartSignIn', () => {
    const store = createStore()
    store.actions.setUser({username: 'davide'})
    store.actions.setIsLoggedIn(true)
    store.actions.changeFlowIndex('new-index')
    store.actions.restartSignIn()
    expect(store.state).toEqual(
      expect.objectContaining({
        flows: { index: null },
        isLoggedIn: false,
        signIn: { error: null, challenge: {} },
        user: null
      })
    )
  })

  test('Set challenge', () => {
    const store = createStore()
    store.actions.setChallenge({ChallengeName: 'NEW_PASSWORD'})
    expect(getChallenge(store.state)).toEqual({ChallengeName: 'NEW_PASSWORD'})
  })
})
