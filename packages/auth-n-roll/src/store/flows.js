import { FLOW_ACTIONS_SIGNIN, FLOW_ACTIONS_SIGNUP } from '../constants'

export function getDefaultState() {
  return {
    flows: {
      action: null,
      index: null
    }
  }
}

export function getFlowsDefaultSignInState() {
  return {
    flows: {
      index: null,
      action: FLOW_ACTIONS_SIGNIN
    }
  }
}

function changeFlowIndex(newIndex) {
  this.updateState({
    flows: Object.assign({}, this.state.flows, {
      index: newIndex
    })
  })
}

function requestSignIn() {
  this.updateState(getFlowsDefaultSignInState())
}

function requestSignUp() {
  this.updateState({
    flows: {
      index: null,
      action: FLOW_ACTIONS_SIGNUP
    }
  })
}

function resetFlows() {
  this.updateState({
    flows: {
      index: null,
      action: null
    }
  })
}

export function getActions(store) {
  return {
    changeFlowIndex: changeFlowIndex.bind(store),
    requestSignIn: requestSignIn.bind(store),
    requestSignUp: requestSignUp.bind(store),
    resetFlows: resetFlows.bind(store)
  }
}

export const getCurrentFlowIndex = (state) => state.flows.index
export const getCurrentFlowAction = (state) => state.flows.action
export const hasSignup = (state) => !state.disabledFeatures.includes('signUp')
export const canSendUsername = (state) => state.additionalFeatures.includes('sendUsername')
