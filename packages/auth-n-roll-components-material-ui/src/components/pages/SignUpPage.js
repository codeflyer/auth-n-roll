import React from 'react'

import { SignUp } from 'auth-n-roll'
import { SignUpCredentials } from '../organisms/SignUpCredentials'
import { SignUpConfirm } from '../organisms/SignUpConfirm'
import { SignUpMessageAndLogin } from '../organisms/SignUpMessageAndLogin'
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

export class SignUpPageBase extends React.Component {
  render() {
    return (
      <div className={this.props.classes.root}>
        <div style={{ width: '300px' }}>
          <SignUp>
            <SignUpCredentials index={SignUp.FLOW_STEP_CREDENTIALS} />
            <SignUpConfirm index={SignUp.FLOW_STEP_CONFIRM_CODE} />
            <SignUpMessageAndLogin index={SignUp.FLOW_STEP_MESSAGE_AND_LOGIN} />
          </SignUp>
        </div>
      </div>
    )
  }
}

export const SignUpPage = withStyles(styles)(SignUpPageBase)
