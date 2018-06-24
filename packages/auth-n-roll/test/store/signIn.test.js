import { Store } from '../../src/store'
import { getSignInError } from '../../src/store/signIn'

describe('Store/signIn', () => {
  let state
  let store

  const setState = newState => (state = Object.assign({}, state, newState))
  const getState = () => state

  beforeEach(() => {
    state = {}
    store = new Store({
      authService: {},
      getState: getState,
      onStateUpdate: setState
    })
    store.updateState(store.getDefaultState())
  })

  test('Defaults', () => {
    expect(getSignInError(store.state)).toEqual({})
  })

  test('setSignInError', () => {
    store.state.setSignInError({code: 10, message: 'err'})
    expect(getSignInError(store.state)).toEqual({code: 10, message: 'err'})
  })

  test('restartSignIn', () => {
    store.state.setUser({username: 'davide'})
    store.state.setIsLoggedIn(true)
    store.state.changeFlowIndex('new-index')
    store.state.restartSignIn()
    expect(store.state).toEqual(
      expect.objectContaining({
        challenge: {},
        flows: { index: null },
        isLoggedIn: false,
        signIn: { error: null },
        user: null
      })
    )
  })
})
