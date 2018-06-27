import { Store } from '../../src/store'
import { getSignInMessage, getChallenge } from '../../src/store/signIn'
import { createStore } from '../helpers/storeMock'

describe('Store/signIn', () => {
  test('Defaults', () => {
    const store = createStore()
    expect(getSignInMessage(store.state)).toEqual({})
    expect(getChallenge(store.state)).toEqual({})
  })

  test('setSignInMessage', () => {
    const store = createStore()
    store.actions.setSignInMessage({code: 10, message: 'err'})
    expect(getSignInMessage(store.state)).toEqual({code: 10, message: 'err'})
  })

  test('restartSignIn', () => {
    const store = createStore()
    store.actions.setLoggedInUser({username: 'davide'})
    store.actions.changeFlowIndex('new-index')
    store.actions.restartSignIn()
    expect(store.state).toEqual(
      expect.objectContaining({
        flows: { index: null },
        isLoggedIn: false,
        signIn: { message: null, challenge: {} },
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
