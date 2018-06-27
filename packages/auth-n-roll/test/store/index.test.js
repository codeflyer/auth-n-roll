import { createStore } from '../helpers/storeMock'

describe('Store', () => {
  test('Initialization', () => {
    const store = createStore()
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
        signIn: { message: null, challenge: {} },
        user: null
      })
    )
  })

  test('setState', () => {
    const store = createStore({initialValues: {}})
    store.updateState({ foo: 'bar' })
    expect(store.state).toEqual({ foo: 'bar' })

    store.updateState({ baz: 'gog' })
    expect(store.state).toEqual({ foo: 'bar', baz: 'gog' })
  })
})
