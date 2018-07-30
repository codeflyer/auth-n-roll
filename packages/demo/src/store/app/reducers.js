import Immutable from 'seamless-immutable'
import { handleActions } from 'redux-actions'
import { appInit, appSignIn, appSignOut, userSignIn } from './actions'

export const initialState = Immutable({
  isOnInit: false,
  loggedUser: null
})

export default handleActions(
  {
    [appInit]: state => state.set('isOnInit', true),
    [appSignIn]: (state, { payload }) => state.set('loggedUser', payload),
    [appSignOut]: state => state.set('loggedUser', null)
  },
  initialState
)
