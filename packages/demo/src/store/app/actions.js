import { createAction } from 'redux-actions'

export const appInit = createAction('APP:INIT')
export const appSignInCancel = createAction('APP:SIGNIN:CANCEL')
export const appSignUpCancel = createAction('APP:SIGNUP:CANCEL')
export const appSignIn = createAction('APP:SIGNIN')
export const appSignOut = createAction('APP:SIGNOUT')


