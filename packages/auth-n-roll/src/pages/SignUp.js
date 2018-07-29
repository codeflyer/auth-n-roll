import React from 'react'

import { GenericFlow } from './GenericFlow'

export class SignUp extends React.Component {
  render() {
    return (
      <GenericFlow
        {...this.props}
        defaultIndex={this.props.defaultIndex || SignUp.FLOW_STEP_CREDENTIALS}
      >
        {this.props.children}
      </GenericFlow>
    )
  }
}

SignUp.FLOW_STEP_CREDENTIALS = 'credentials'
SignUp.FLOW_STEP_CONFIRM_CODE = 'confirm_code'
SignUp.FLOW_STEP_MESSAGE_AND_LOGIN = 'message_and_login'
