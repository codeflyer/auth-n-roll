export { isLoggedIn, getChallenge, getUser } from './user'
export { getCurrentFlowIndex } from './flows'
export { getSignInError } from './signIn'
export {
  getResendValidationCodeSendingState,
  getResendValidationCodeSendingError
} from './resendValidationCode'

export const getAuthService = state =>
  state.authService
