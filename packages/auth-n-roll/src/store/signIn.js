import { getDefaultState as getFlowsDefaultState, getFlowsDefaultSignInState } from './flows'
import { getDefaultState as getUserDefaultState } from './user'

export function getDefaultState() {
  return {
    signIn: {
      message: null,
      challenge: {}
    },
    signUp: {
      message: null,
      result: {}
    }
  }
}

export function getActions(store) {
  return {
    restartSignIn: restartSignIn.bind(store),
    startSignIn: restartSignIn.bind(store), // start and restart have for now the same behavior
    setChallenge: setChallenge.bind(store),
    setSignInMessage: setSignInMessage.bind(store),
    setSignUpMessage: setSignUpMessage.bind(store),
    setSignUpResult: setSignUpResult.bind(store)
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

function setSignUpMessage(message) {
  this.updateState({
    signUp: Object.assign({}, this.state.signUp, {
      message
    })
  })
}

function setSignUpResult(result) {
  this.updateState({
    signUp: Object.assign({}, this.state.signUp, {
      result
    })
  })
}

function restartSignIn() {
  this.updateState({
    ...getUserDefaultState(),
    ...getFlowsDefaultSignInState(),
    ...getDefaultState()
  })
}

export const getChallenge = state => state.signIn.challenge

export const getSignInMessage = state => state.signIn.message || {}
export const getSignUpMessage = state => state.signUp.message || {}
