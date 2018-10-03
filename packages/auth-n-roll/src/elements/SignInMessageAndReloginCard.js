import React from 'react'

import { withAuthNRoll } from '../contexts'
import { getSignInMessage } from '../store/selectors'

const titles = {
  'change-password-forced': 'TITLE_CHANGE_PASSWORD_FAILED',
  'confirm-sign-up': 'TITLE_USER_VERIFIED',
  'confirm-sign-up-fail': 'TITLE_USER_VERIFY_FAIL',
  'reset-password-success': 'TITLE_RESET_PASSWORD_SUCCESS',
  'send-username-success': 'TITLE_SEND_USERNAME_SUCCESS'
}

export const SignInMessageAndReloginCard = ({ children }) => (
  <React.Fragment>{children}</React.Fragment>
)

SignInMessageAndReloginCard.Message = withAuthNRoll(({ authNRoll }) => {
  return (
    <React.Fragment>{getSignInMessage(authNRoll).message || ''}</React.Fragment>
  )
})

SignInMessageAndReloginCard.Title = withAuthNRoll(({ authNRoll }) => {
  return (
    <React.Fragment>
      {authNRoll.labels[titles[getSignInMessage(authNRoll).from]] || ''}
    </React.Fragment>
  )
})

SignInMessageAndReloginCard.RestartSignInButton = withAuthNRoll(
  ({ authNRoll, authNRollActions, children }) => {
    return (
      <React.Fragment>
        {React.Children.map(children, child =>
          React.cloneElement(child, {
            onClick: authNRollActions.restartSignIn
          })
        )}
      </React.Fragment>
    )
  }
)
