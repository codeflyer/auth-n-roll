import { Store } from '../../src/store'
import { isLoggedIn, getUser, getChallenge } from '../../src/store/user'

describe('Store/user', () => {
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
    expect(isLoggedIn(store.state)).toBeFalsy()
    expect(getUser(store.state)).toBeNull()
  })

  test('Set is loggedIn', () => {
    store.state.setIsLoggedIn(true)
    expect(isLoggedIn(store.state)).toBeTruthy()
  })

  test('Set user', () => {
    store.state.setUser({username: 'davide'})
    expect(getUser(store.state)).toEqual({username: 'davide'})
  })
})
