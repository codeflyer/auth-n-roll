import { getDefaultState as getFlowsDefaultState } from './flows'
import { getDefaultState as getUserDefaultState } from './user'

export function getDefaultState() {
  return {
    signIn: {
      error: null
    }
  }
}

export function getActions(store) {
  return {
    restartSignIn: restartSignIn.bind(store),
    setSignInError: setSignInError.bind(store)
  }
}

function setSignInError(error) {
  this.updateState({
    signIn: Object.assign({}, this.state.signIn, {
      error
    })
  })
}

function restartSignIn() {
  this.updateState({
    ...getUserDefaultState(),
    ...getFlowsDefaultState(),
    ...getDefaultState()
  })
}

export const getSignInError = state =>
  state.signIn.error || {}
