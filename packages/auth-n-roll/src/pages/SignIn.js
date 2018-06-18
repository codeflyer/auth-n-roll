import React from 'react'

import { GenericFlow } from './GenericFlow'

export class SignIn extends React.Component {
  render() {
    return (
      <GenericFlow
        {...this.props}
        defaultIndex={this.props.defaultIndex || SignIn.FLOW_STEP_CREDENTIAL}
      >
        {this.props.children}
      </GenericFlow>
    )
  }
}

SignIn.FLOW_STEP_CREDENTIAL = 'credentials'
SignIn.FLOW_STEP_CHANGE_PASSWORD = 'change_password'
SignIn.FLOW_STEP_CONFIRM_CODE = 'confirm_code'
SignIn.FLOW_STEP_ERROR_AND_RELOGIN = 'error_and_relogin'
