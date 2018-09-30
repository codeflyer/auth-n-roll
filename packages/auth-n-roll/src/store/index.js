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
  getDefaultState as getResetPasswordDefaultState,
  getActions as getResetPasswordActions
} from './resetPassword'
import {
  getDefaultState as getSignInDefaultState,
  getActions as getSignInActions
} from './signIn'
import createLabels from './labels'

export class Store {
  constructor({ getState, onStateUpdate, authService, debug, cookiePrefix, props = {} }) {
    this.authService = authService
    this.getState = getState
    this.onStateUpdate = onStateUpdate
    this.debug = debug
    this.props = props
    this.cookiePrefix = cookiePrefix
    setCookiePrefix(cookiePrefix)
    setAuthService(authService)
  }

  getDefaultState() {
    return {
      authService: this.authService,
      debug: this.debug,
      labels: createLabels(this.props.translator),

      disabledFeatures: this.props.disabledFeatures || [],

      ...getUserDefaultState(),

      ...getFlowsDefaultState(),

      ...getResendValidationCodeDefaultState(),

      ...getResetPasswordDefaultState(),

      ...getSignInDefaultState()
    }
  }

  getActions(props) {
    const {
      signUp,
      signIn,
      confirmSignUp,
      resendConfirmationCode,
      changePasswordForced,
      refresh
    } = this.authService

    return {
      ...getUserActions(this, props),
      ...getFlowsActions(this, props),
      ...getResendValidationCodeActions(this, props),
      ...getResetPasswordActions(this, props),
      ...getSignInActions(this, props),

      // TODO These actions are currently used directly from the service, wrap it in an actions
      signUp,
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
