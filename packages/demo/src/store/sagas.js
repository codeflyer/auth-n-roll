import { takeEvery, all } from 'redux-saga/effects'

import { appInitSaga, appSignInCancelSaga, appSignUpCancelSaga } from './app/sagas'
import { appInit as appInitAction, appSignInCancel, appSignUpCancel } from './app/actions'

const sagas = [
  // APP
  [takeEvery, appInitAction, appInitSaga],
  [takeEvery, appSignInCancel, appSignInCancelSaga],
  [takeEvery, appSignUpCancel, appSignUpCancelSaga]
]

function * rootSaga () {
  yield all([
    ...sagas
      .map(
        saga =>
          function * () {
            yield saga[0](saga[1], saga[2])
          }
      )
      .map(saga => saga.call())
  ])
}

export default rootSaga
