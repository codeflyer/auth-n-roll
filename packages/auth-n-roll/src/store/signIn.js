import { getDefaultState as getFlowsDefaultState } from './flows'
import { getDefaultState as getUserDefaultState } from './user'

export function getDefaultState() {
  return {
    signIn: {
      error: null,
      challenge: {}
    }
  }
}

export function getActions(store) {
  return {
    restartSignIn: restartSignIn.bind(store),
    setChallenge: setChallenge.bind(store),
    setSignInError: setSignInError.bind(store)
  }
}

function setChallenge(challenge) {
  this.updateState({
    signIn: Object.assign({}, this.state.signIn, {
      challenge
    })
  })
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

export const getChallenge = (state) => state.signIn.challenge

export const getSignInError = state =>
  state.signIn.error || {}
