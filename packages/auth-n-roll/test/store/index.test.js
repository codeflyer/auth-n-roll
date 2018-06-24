import { Store } from '../../src/store'

describe('Store', () => {
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
  })

  test('Initialization', () => {
    expect(store.getDefaultState()).toEqual(
      expect.objectContaining({
        authService: expect.any(Object),
        debug: undefined,
        flows: { index: null },
        isLoggedIn: false,
        resendValidationCodeState: {
          error: null,
          sendingState: 'NOT_REQUESTED'
        },
        signIn: { error: null, challenge: {} },
        user: null
      })
    )
  })

  test('setState', () => {
    store.updateState({ foo: 'bar' })
    expect(store.state).toEqual({ foo: 'bar' })

    store.updateState({ baz: 'gog' })
    expect(store.state).toEqual({ foo: 'bar', baz: 'gog' })
  })
})
