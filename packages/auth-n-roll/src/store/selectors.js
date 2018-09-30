export { isLoggedIn, isRehydrating, getUser, getSignUpUser } from './user'
export { getCurrentFlowIndex, getCurrentFlowAction, hasSignup } from './flows'
export { getChallenge, getSignInMessage, getSignUpMessage } from './signIn'
export {
  getResendValidationCodeSendingState,
  getResendValidationCodeSendingError
} from './resendValidationCode'

export const getAuthService = state =>
  state.authService
