import {
  getResendValidationCodeSendingError,
  getResendValidationCodeSendingState
} from '../../src/store/resendValidationCode'
import { createStore } from '../helpers/storeMock'

describe('Store/resendValidationCode', () => {
  test('Defaults', () => {
    const store = createStore()
    expect(getResendValidationCodeSendingState(store.state)).toEqual('NOT_REQUESTED')
    expect(getResendValidationCodeSendingError(store.state)).toEqual({})
  })

  test('resendValidationCode Success', async () => {
    const resendValidationCodeMockPromise = jest.fn()
    const store = createStore({authService: { resendValidationCode: resendValidationCodeMockPromise }})

    let done
    const promise = new Promise((resolve, reject) => {
      done = resolve
    })
    resendValidationCodeMockPromise.mockReturnValue(promise)

    store.actions.setUser({ username: 'davide' })
    store.actions.resendValidationCode()
    expect(getResendValidationCodeSendingState(store.state)).toEqual('SENDING')
    await done()
    expect(getResendValidationCodeSendingState(store.state)).toEqual('SENDING_SUCCESS')
  })

  test('resendValidationCode Error', async () => {
    const resendValidationCodeMockPromise = jest.fn()
    const store = createStore({authService: { resendValidationCode: resendValidationCodeMockPromise }})

    let error
    const promise = new Promise((resolve, reject) => {
      error = reject
    })
    resendValidationCodeMockPromise.mockReturnValue(promise)
    store.actions.setUser({ username: 'davide' })
    store.actions.resendValidationCode()
    expect(getResendValidationCodeSendingState(store.state)).toEqual('SENDING')
    await error({ message: 'some_error' })
    expect(getResendValidationCodeSendingState(store.state)).toEqual('SENDING_ERROR')
    expect(getResendValidationCodeSendingError(store.state)).toEqual('some_error')
  })
})
