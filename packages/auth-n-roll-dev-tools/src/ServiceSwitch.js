import React from 'react'

import { setState, getState } from './ServiceInMemory'

import {
  SIGN_IN_RESPONSE_USER_NOT_FOUND,
  SIGN_IN_RESPONSE_NOT_AUTHORIZED,
  SIGN_IN_RESPONSE_OK,
  SIGN_IN_RESPONSE_CHANGE_PASSWORD,
  SIGN_IN_RESPONSE_NOT_CONFIRMED,
  SIGN_IN_RESPONSE_SOFTWARE_TOKEN_MFA,
  RESEND_VALIDATION_CODE_RESPONSE_OK,
  RESEND_VALIDATION_CODE_RESPONSE_ERROR,
  CONFIRM_SIGN_UP_CODE_MISMATCH,
  CONFIRM_SIGN_UP_USER_NOT_FOUND,
  CONFIRM_SIGN_UP_EXPIRED_CODE,
  CONFIRM_SIGN_UP_ERROR,
  CONFIRM_SIGN_UP_RESPONSE_OK,
  CHANGE_PASSWORD_FORCED_USER_NOT_FOUND,
  CHANGE_PASSWORD_FORCED_INVALID_PASSWORD,
  CHANGE_PASSWORD_FORCED_ERROR
} from 'auth-n-roll'

const styleButton = {
  height: '30px',
  width: '100%',
  backgroundColor: '#ddd'
}

const styles = {
  wrapper: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    width: '200px'
  },
  button: Object.assign({}, styleButton, {
    backgroundColor: '#f4f4f4'
  }),
  selectedButton: Object.assign({}, styleButton, {
    backgroundColor: '#cccccc'
  })
}

const SwitchButton = ({ name, checkValue, label, update }) => (
  <button
    style={
      getState(name) === checkValue ? styles.selectedButton : styles.button
    }
    onClick={() => update(setState.bind(null, name), checkValue)}
  >
    {label}
  </button>
)

export class ServiceSwitch extends React.Component {
  constructor(props) {
    super(props)

    this.handleUpdate = this.handleUpdate.bind(this)
  }

  handleUpdate(func, value) {
    func(value)
    this.setState({})
  }

  render() {
    return (
      <div style={styles.wrapper}>
        <div>
          <div>SignIn</div>
          <div>
            <SwitchButton
              name="signinResponse"
              checkValue={SIGN_IN_RESPONSE_OK}
              label="OK"
              update={this.handleUpdate}
            />
            <SwitchButton
              name="signinResponse"
              checkValue={SIGN_IN_RESPONSE_CHANGE_PASSWORD}
              label="Change PWD"
              update={this.handleUpdate}
            />
            <SwitchButton
              name="signinResponse"
              checkValue={SIGN_IN_RESPONSE_USER_NOT_FOUND}
              label="Not Found"
              update={this.handleUpdate}
            />
            <SwitchButton
              name="signinResponse"
              checkValue={SIGN_IN_RESPONSE_NOT_AUTHORIZED}
              label="Not Auth"
              update={this.handleUpdate}
            />
            <SwitchButton
              name="signinResponse"
              checkValue={SIGN_IN_RESPONSE_NOT_CONFIRMED}
              label="Not Confirmed"
              update={this.handleUpdate}
            />
          </div>
          <div>Confirm Sign UP</div>
          <div>
            <SwitchButton
              name="confirmSignUpResponse"
              checkValue={CONFIRM_SIGN_UP_RESPONSE_OK}
              label="Success"
              update={this.handleUpdate}
            />
            <SwitchButton
              name="confirmSignUpResponse"
              checkValue={CONFIRM_SIGN_UP_EXPIRED_CODE}
              label="Code Expired"
              update={this.handleUpdate}
            />
            <SwitchButton
              name="confirmSignUpResponse"
              checkValue={CONFIRM_SIGN_UP_USER_NOT_FOUND}
              label="User not found"
              update={this.handleUpdate}
            />
            <SwitchButton
              name="confirmSignUpResponse"
              checkValue={CONFIRM_SIGN_UP_CODE_MISMATCH}
              label="Code mismatch"
              update={this.handleUpdate}
            />
            <SwitchButton
              name="confirmSignUpResponse"
              checkValue={CONFIRM_SIGN_UP_ERROR}
              label="Error"
              update={this.handleUpdate}
            />
          </div>
          <div>Resend Code</div>
          <div>
            <SwitchButton
              name="resendValidationCodeResponse"
              checkValue={RESEND_VALIDATION_CODE_RESPONSE_OK}
              label="Success"
              update={this.handleUpdate}
            />
            <SwitchButton
              name="resendValidationCodeResponse"
              checkValue={RESEND_VALIDATION_CODE_RESPONSE_ERROR}
              label="Error"
              update={this.handleUpdate}
            />
          </div>
          <div>Force NEW PWD</div>
          <div>
            <SwitchButton
              name="changePasswordForced"
              checkValue={''}
              label="Success"
              update={this.handleUpdate}
            />
            <SwitchButton
              name="changePasswordForced"
              checkValue={CHANGE_PASSWORD_FORCED_USER_NOT_FOUND}
              label="User not found"
              update={this.handleUpdate}
            />
            <SwitchButton
              name="changePasswordForced"
              checkValue={CHANGE_PASSWORD_FORCED_INVALID_PASSWORD}
              label="Invalid password"
              update={this.handleUpdate}
            />
            <SwitchButton
              name="changePasswordForced"
              checkValue={CHANGE_PASSWORD_FORCED_ERROR}
              label="Error on change"
              update={this.handleUpdate}
            />
          </div>
        </div>
      </div>
    )
  }
}
