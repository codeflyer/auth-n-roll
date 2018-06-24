import { Store } from '../../src/store'
import {
  getResendValidationCodeSendingError,
  getResendValidationCodeSendingState
} from '../../src/store/resendValidationCode'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))
describe('Store/resendValidationCode', () => {
  let state
  let store
  let resendValidationCodeMockPromise
  const setState = newState => (state = Object.assign({}, state, newState))
  const getState = () => state

  beforeEach(() => {
    state = {}
    resendValidationCodeMockPromise = jest.fn()
    store = new Store({
      authService: { resendValidationCode: resendValidationCodeMockPromise },
      getState: getState,
      onStateUpdate: setState
    })
    store.updateState(store.getDefaultState())
  })

  test('Defaults', () => {
    expect(getResendValidationCodeSendingState(store.state)).toEqual('NOT_REQUESTED')
    expect(getResendValidationCodeSendingError(store.state)).toEqual({})
  })

  test('resendValidationCode Success', async () => {
    let done
    let error
    const promise = new Promise((resolve, reject) => {
      done = resolve
      error = reject
    })
    resendValidationCodeMockPromise.mockReturnValue(promise)

    store.state.setUser({ username: 'davide' })
    store.state.resendValidationCode()
    expect(getResendValidationCodeSendingState(store.state)).toEqual('SENDING')
    await done()
    expect(getResendValidationCodeSendingState(store.state)).toEqual('SENDING_SUCCESS')
  })

  test('resendValidationCode Error', async () => {
    let done
    let error
    const promise = new Promise((resolve, reject) => {
      done = resolve
      error = reject
    })
    resendValidationCodeMockPromise.mockReturnValue(promise)
    store.state.setUser({ username: 'davide' })
    store.state.resendValidationCode()
    expect(getResendValidationCodeSendingState(store.state)).toEqual('SENDING')
    await error({ message: 'some_error' })
    expect(getResendValidationCodeSendingState(store.state)).toEqual('SENDING_ERROR')
    expect(getResendValidationCodeSendingError(store.state)).toEqual('some_error')
  })

})
