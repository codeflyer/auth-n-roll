import React from 'react'
import get from 'lodash/get'
import { withAuthNRoll } from '../contexts'
import { SignInResendValidationCode } from './SignInResendValidationCode'

export const SignInErrorAndReloginCard = ({ children }) => (
  <React.Fragment>{children}</React.Fragment>
)

// export class SignInErrorAndReloginCard extends React.Component {
//   render() {
//     return (
//       <div>
//         Add something here
//         {this.props.children}
//         <hr />
//       </div>
//     )
//   }
// }
//

SignInErrorAndReloginCard.ErrorMessage = withAuthNRoll(({ authNRoll }) => {
  return (
    <React.Fragment>{get(authNRoll, 'signIn.error.message')}</React.Fragment>
  )
})

SignInErrorAndReloginCard.BackToLoginButton = withAuthNRoll(({ authNRoll }) => {
  return (
    <React.Fragment>{get(authNRoll, 'signIn.error.message')}</React.Fragment>
  )
})

SignInErrorAndReloginCard.RestartSignInButton = withAuthNRoll(({ authNRoll, children }) => {
  return (
    <React.Fragment>
      {React.Children.map(children, child =>
        React.cloneElement(child, {
          onClick: authNRoll.restartSignIn
        })
      )}
    </React.Fragment>
  )
})
