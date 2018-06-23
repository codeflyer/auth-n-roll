import {
  getDefaultState as getUserDefaultState,
  getActions as getUserActions
} from './user'

import {
  getDefaultState as getFlowsDefaultState,
  getActions as getFlowsActions
} from './flows'

import {
  getDefaultState as getResendValidationCodeDefaultState,
  getActions as getResendValidationCodeActions
} from './resendValidationCode'

import {
  getDefaultState as getSignInDefaultState,
  getActions as getSignInActions
} from './signIn'

export class Store {
  constructor({ getState, onStateUpdate, authService, debug }) {
    this.authService = authService
    this.getState = getState
    this.onStateUpdate = onStateUpdate
    this.debug = debug
  }

  getDefaultState() {
    return {
      authService: this.authService,
      debug: this.debug,

      ...getUserDefaultState(),
      ...getUserActions(this),

      ...getFlowsDefaultState(),
      ...getFlowsActions(this),

      ...getResendValidationCodeDefaultState(),
      ...getResendValidationCodeActions(this),

      ...getSignInDefaultState(),
      ...getSignInActions(this)
    }
  }

  get state() {
    return this.getState()
  }

  updateState(state) {
    const newState = Object.assign({}, this.state, state)
    return this.onStateUpdate(newState)
  }
}
