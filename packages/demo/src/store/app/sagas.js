import logger from '../../adapters/logger'
import { put } from 'redux-saga/effects'
import { push } from 'react-router-redux'

export function* appSignInCancelSaga() {
  yield put(push('/'))
}

export function* appSignUpCancelSaga() {
  yield put(push('/'))
}

export function* appInitSaga() {
  logger.info({ message: 'Init application', tags: ['INIT'] })
  logger.info({ message: 'Configure Amplify', tags: ['INIT'] })

  yield Promise.resolve() // Remove this (required for eslint)

  logger.info({ message: 'Amplify configured', tags: ['INIT'] })
  logger.info({ message: 'App Initialized', tags: ['INIT'] })
}
