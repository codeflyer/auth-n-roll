import React from 'react'

import { SignIn } from 'auth-n-roll'
import { SignInCredentials } from '../organisms/SignInCredentials'
import { SignInChangePassword } from '../organisms/SignInChangePassword'
import { SignInConfirmSignUp } from '../organisms/SignInConfirmSignUp'
import { SignInMessageAndRelogin } from '../organisms/SignInMessageAndRelogin'
import { withStyles } from '@material-ui/core/styles/index'

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: 'gray'
  }
})

export class SignInPageBase extends React.Component {
  render() {
    return (
      <div className={this.props.classes.root}>
        <div style={{ width: '300px' }}>
          <SignIn>
            <SignInCredentials index={SignIn.FLOW_STEP_CREDENTIALS} />
            <SignInChangePassword index={SignIn.FLOW_STEP_CHANGE_PASSWORD} />
            <SignInConfirmSignUp index={SignIn.FLOW_STEP_CONFIRM_CODE} />
            <SignInMessageAndRelogin
              index={SignIn.FLOW_STEP_MESSAGE_AND_RELOGIN}
            />
          </SignIn>
        </div>
      </div>
    )
  }
}

export const SignInPage = withStyles(styles)(SignInPageBase)