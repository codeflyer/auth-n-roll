export { isLoggedIn, getUser } from './user'
export { getCurrentFlowIndex } from './flows'
export { getChallenge, getSignInMessage } from './signIn'
export {
  getResendValidationCodeSendingState,
  getResendValidationCodeSendingError
} from './resendValidationCode'

export const getAuthService = state =>
  state.authService
