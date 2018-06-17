import React from 'react'

import { GenericFlow } from './GenericFlow'
import { SwitchElement } from '../components/Switch'

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
SignIn.FLOW_STEP_VALIDATE_CODE = 'validate_code'
