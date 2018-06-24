import { isLoggedIn, getUser, getChallenge } from '../../src/store/user'
import { createStore } from '../helpers/storeMock'

describe('Store/user', () => {
  test('Defaults', () => {
    const store = createStore()
    expect(isLoggedIn(store.state)).toBeFalsy()
    expect(getUser(store.state)).toBeNull()
  })

  test('Set is loggedIn', () => {
    const store = createStore()
    store.actions.setIsLoggedIn(true)
    expect(isLoggedIn(store.state)).toBeTruthy()
  })

  test('Set user', () => {
    const store = createStore()
    store.actions.setUser({username: 'davide'})
    expect(getUser(store.state)).toEqual({username: 'davide'})
  })
})
