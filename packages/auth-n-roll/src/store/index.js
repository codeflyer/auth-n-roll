import {
  setCookiePrefix,
  setAuthService,
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

import labels from './labels'

export class Store {
  constructor({ getState, onStateUpdate, authService, debug, cookiePrefix }) {
    this.authService = authService
    this.getState = getState
    this.onStateUpdate = onStateUpdate
    this.debug = debug
    this.cookiePrefix = cookiePrefix
    setCookiePrefix(cookiePrefix)
    setAuthService(authService)
  }

  getDefaultState() {
    return {
      authService: this.authService,
      debug: this.debug,
      labels: labels,

      ...getUserDefaultState(),

      ...getFlowsDefaultState(),

      ...getResendValidationCodeDefaultState(),

      ...getSignInDefaultState()
    }
  }

  getActions() {
    const {
      signIn,
      confirmSignUp,
      resendConfirmationCode,
      changePasswordForced,
      refresh
    } = this.authService

    return {
      ...getUserActions(this),
      ...getFlowsActions(this),
      ...getResendValidationCodeActions(this),
      ...getSignInActions(this),

      // TODO These actions are currently used directly from the service, wrap it in an actions
      signIn,
      confirmSignUp,
      resendConfirmationCode,
      changePasswordForced,
      refresh
    }
  }

  get state() {
    return this.getState().state
  }

  get actions() {
    return this.getState().actions
  }

  updateState(state) {
    const newState = Object.assign({}, this.state, state)
    return this.onStateUpdate(
      Object.assign({}, this.getState(), { state: newState })
    )
  }
}
