import { isLoggedIn, getUser } from '../../src/store/user'
import { createStore } from '../helpers/storeMock'

describe('Store/user', () => {
  let localStorageValue
  let mockRefreshMock
  beforeEach(() => {
    localStorageValue = {}
    const localStorageMock = {
      getItem: (key) => localStorageValue[key],
      setItem: (key, val) => (localStorageValue[key] = val),
      clear: (key) => (localStorageValue[key] = null)
    }
    mockRefreshMock = jest.fn()
    global.window.localStorage = localStorageMock
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
    const expires = Math.floor(Date.now() / 1000) + 100
    const store = createStore({ authService: { refresh: mockRefreshMock } })
    window.localStorage.setItem(
      'auth-n-roll-user',
      JSON.stringify({ username: 'davide' })
    )
    window.localStorage.setItem(
      'auth-n-roll-auth-data',
      JSON.stringify({ Expires: expires, RefreshToken: 'sometoken' })
    )
    mockRefreshMock.mockReturnValueOnce(
      Promise.resolve({
        authData: { Expires: expires + 1000, RefreshToken: 'anothertoken' }
      })
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
    const expires = Math.floor(Date.now() / 1000) + 100
    const store = createStore()
    await store.actions.setLoggedInUser(
      { username: 'davide' },
      { Expires: expires, RefreshToken: 'sometoken' }
    )
    expect(window.localStorage.getItem(`auth-n-roll-user`)).toBe(
      JSON.stringify({ username: 'davide' })
    )
    expect(window.localStorage.getItem(`auth-n-roll-auth-data`)).toBe(
      JSON.stringify({ Expires: expires, RefreshToken: 'sometoken' })
    )
  })

  test('without the localstorage should not crash', async () => {
    const expires = Math.floor(Date.now() / 1000) + 100
    global.localStorage = null
    const store = createStore()
    await store.actions.setLoggedInUser(
      { username: 'davide' },
      { Expires: expires, RefreshToken: 'sometoken' }
    )
    await store.actions.rehydrateUser()
  })
})
