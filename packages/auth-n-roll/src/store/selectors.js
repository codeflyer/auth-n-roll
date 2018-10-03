export { isLoggedIn, isRehydrating, getUser, getSignUpUser } from './user'
export {
  getCurrentFlowIndex,
  getCurrentFlowAction,
  hasSignup,
  canSendUsername
} from './flows'
export {
  getChallenge,
  getSignInMessage,
  getSignUpMessage,
  signInWith
} from './signIn'
export {
  getResendValidationCodeSendingState,
  getResendValidationCodeSendingError
} from './resendValidationCode'

export {
  getResetPasswordFields,
  getResetPasswordSendingError,
  getResetPasswordSendingState
} from './resetPassword'

export const getAuthService = state => state.authService
