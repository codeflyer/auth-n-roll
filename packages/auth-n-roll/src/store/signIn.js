import { getDefaultState as getFlowsDefaultState } from './flows'
import { getDefaultState as getUserDefaultState } from './user'

export function getDefaultState() {
  return {
    signIn: {
      message: null,
      challenge: {}
    }
  }
}

export function getActions(store) {
  return {
    restartSignIn: restartSignIn.bind(store),
    setChallenge: setChallenge.bind(store),
    setSignInMessage: setSignInMessage.bind(store)
  }
}

function setChallenge(challenge) {
  this.updateState({
    signIn: Object.assign({}, this.state.signIn, {
      challenge
    })
  })
}

function setSignInMessage(message) {
  this.updateState({
    signIn: Object.assign({}, this.state.signIn, {
      message
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

export const getSignInMessage = state =>
  state.signIn.message || {}
