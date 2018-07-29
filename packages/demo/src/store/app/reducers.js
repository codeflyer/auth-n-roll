import Immutable from 'seamless-immutable'
import { handleActions } from 'redux-actions'
import { appInit } from './actions'

export const initialState = Immutable({
  isOnInit: false
})

export default handleActions(
  {
    [appInit]: state => state.set('isOnInit', true)
  },
  initialState
)
