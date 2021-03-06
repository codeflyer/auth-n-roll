import React from 'react'

import { GenericFlow } from './GenericFlow'

export class SignIn extends React.Component {
  render() {
    return (
      <GenericFlow
        {...this.props}
        defaultIndex={this.props.defaultIndex || SignIn.FLOW_STEP_CREDENTIALS}
      >
        {this.props.children}
      </GenericFlow>
    )
  }
}

SignIn.FLOW_STEP_CREDENTIALS = 'credentials'
SignIn.FLOW_STEP_CHANGE_PASSWORD = 'change_password'
SignIn.FLOW_STEP_RESET_PASSWORD = 'reset_password'
SignIn.FLOW_STEP_CONFIRM_CODE = 'confirm_code'
SignIn.FLOW_STEP_MESSAGE_AND_RELOGIN = 'message_and_relogin'
SignIn.FLOW_STEP_SEND_USERNAME = 'send_username'
