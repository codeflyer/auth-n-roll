import React from 'react'

import { setState, getState } from './ServiceInMemory'

import {
  USER_NOT_FOUND_ERROR,
  NOT_AUTHORIZED_ERROR,
  RESPONSE_SUCCESS,
  FORCE_CHANGE_PASSWORD_CHALLENGE,
  USER_NOT_CONFIRMED_ERROR,
  GENERIC_ERROR,
  VALIDATION_CODE_MISMATCH_ERROR,
  EXPIRED_VALIDATION_CODE_ERROR,
  UNMANAGED_ERROR,
  INVALID_PASSWORD_ERROR,
  USERNAME_EXISTS_ERROR
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
              checkValue={RESPONSE_SUCCESS}
              label="OK"
              update={this.handleUpdate}
            />
            <SwitchButton
              name="signinResponse"
              checkValue={FORCE_CHANGE_PASSWORD_CHALLENGE}
              label="Change PWD"
              update={this.handleUpdate}
            />
            <SwitchButton
              name="signinResponse"
              checkValue={USER_NOT_FOUND_ERROR}
              label="Not Found"
              update={this.handleUpdate}
            />
            <SwitchButton
              name="signinResponse"
              checkValue={NOT_AUTHORIZED_ERROR}
              label="Not Auth"
              update={this.handleUpdate}
            />
            <SwitchButton
              name="signinResponse"
              checkValue={USER_NOT_CONFIRMED_ERROR}
              label="Not Confirmed"
              update={this.handleUpdate}
            />
          </div>
          <div>Confirm Sign UP</div>
          <div>
            <SwitchButton
              name="confirmSignUpResponse"
              checkValue={RESPONSE_SUCCESS}
              label="Success"
              update={this.handleUpdate}
            />
            <SwitchButton
              name="confirmSignUpResponse"
              checkValue={EXPIRED_VALIDATION_CODE_ERROR}
              label="Code Expired"
              update={this.handleUpdate}
            />
            <SwitchButton
              name="confirmSignUpResponse"
              checkValue={USER_NOT_FOUND_ERROR}
              label="User not found"
              update={this.handleUpdate}
            />
            <SwitchButton
              name="confirmSignUpResponse"
              checkValue={VALIDATION_CODE_MISMATCH_ERROR}
              label="Code mismatch"
              update={this.handleUpdate}
            />
            <SwitchButton
              name="confirmSignUpResponse"
              checkValue={GENERIC_ERROR}
              label="Error"
              update={this.handleUpdate}
            />
          </div>
          <div>Resend Code</div>
          <div>
            <SwitchButton
              name="resendValidationCodeResponse"
              checkValue={RESPONSE_SUCCESS}
              label="Success"
              update={this.handleUpdate}
            />
            <SwitchButton
              name="resendValidationCodeResponse"
              checkValue={GENERIC_ERROR}
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
              checkValue={USER_NOT_FOUND_ERROR}
              label="User not found"
              update={this.handleUpdate}
            />
            <SwitchButton
              name="changePasswordForced"
              checkValue={INVALID_PASSWORD_ERROR}
              label="Invalid password"
              update={this.handleUpdate}
            />
            <SwitchButton
              name="changePasswordForced"
              checkValue={GENERIC_ERROR}
              label="Error on change"
              update={this.handleUpdate}
            />
          </div>
          <div>SignUP</div>
          <div>
            <SwitchButton
              name="signupResponse"
              checkValue={''}
              label="Success"
              update={this.handleUpdate}
            />
            <SwitchButton
              name="signupResponse"
              checkValue={USERNAME_EXISTS_ERROR}
              label="User name exists"
              update={this.handleUpdate}
            />
            <SwitchButton
              name="signupResponse"
              checkValue={INVALID_PASSWORD_ERROR}
              label="Invalid password"
              update={this.handleUpdate}
            />
            <SwitchButton
              name="signupResponse"
              checkValue={GENERIC_ERROR}
              label="Error on change"
              update={this.handleUpdate}
            />
          </div>
        </div>
      </div>
    )
  }
}
