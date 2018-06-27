import { isLoggedIn, getUser, getChallenge } from '../../src/store/user'
import { createStore } from '../helpers/storeMock'

describe('Store/user', () => {
  let localStorageValue
  beforeEach(() => {
    localStorageValue = null
    const localStorageMock = {
      getItem: () => localStorageValue,
      setItem: (key, val) => (localStorageValue = val),
      clear: () => (localStorageValue = null)
    }
    global.localStorage = localStorageMock
  })

  test('Defaults', () => {
    const store = createStore()
    expect(isLoggedIn(store.state)).toBeFalsy()
    expect(getUser(store.state)).toBeNull()
  })

  test('Set is setLoggedInUser', () => {
    const store = createStore()
    store.actions.setLoggedInUser({ username: 'davide' })
    expect(isLoggedIn(store.state)).toBeTruthy()
  })

  test('Set user', () => {
    const store = createStore()
    store.actions.setUser({ username: 'davide' })
    expect(getUser(store.state)).toEqual({ username: 'davide' })
  })

  test('rehydrateUser', async () => {
    const store = createStore()
    window.localStorage.setItem(
      'auth-n-roll-user',
      JSON.stringify({ username: 'davide' })
    )
    await store.actions.rehydrateUser()
    expect(getUser(store.state)).toEqual({ username: 'davide' })
    expect(isLoggedIn(store.state)).toBeTruthy()
  })

  test('rehydrateUser with no user', async () => {
    const store = createStore()
    await store.actions.rehydrateUser()
    expect(getUser(store.state)).toEqual(null)
    expect(isLoggedIn(store.state)).toBeFalsy()
  })

  test('storeUser', async () => {
    const store = createStore()
    await store.actions.setLoggedInUser({ username: 'davide' })
    expect(localStorageValue).toBe(JSON.stringify({ username: 'davide' }))
  })

  test('without the localstorage should not crash', async () => {
    global.localStorage = null
    const store = createStore()
    await store.actions.setLoggedInUser({ username: 'davide' })
    await store.actions.rehydrateUser()
  })
})
