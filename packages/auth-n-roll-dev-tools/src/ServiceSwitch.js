import React from 'react'

import {
  getSignInResponse,
  setSignInResponse,
  setResendValidationCodeResponse,
  getResendValidationCodeResponse
} from './ServiceInMemory'

import {
  SIGN_IN_RESPONSE_USER_NOT_FOUND,
  SIGN_IN_RESPONSE_NOT_AUTHORIZED,
  SIGN_IN_RESPONSE_OK,
  SIGN_IN_RESPONSE_CHANGE_PASSWORD,
  SIGN_IN_RESPONSE_NOT_CONFIRMED,
  SIGN_IN_RESPONSE_SOFTWARE_TOKEN_MFA,
  RESEND_VALIDATION_CODE_RESPONSE_SENDING_ERROR,
  RESEND_VALIDATION_CODE_RESPONSE_SENDING_SUCCESS
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

const SwitchButton = ({ getValue, setValue, checkValue , label, update}) => (
  <button
    style={getValue() === checkValue ? styles.selectedButton : styles.button}
    onClick={() => update(setValue, checkValue)}
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
              getValue={getSignInResponse}
              checkValue={SIGN_IN_RESPONSE_OK}
              setValue={setSignInResponse}
              label="OK"
              update={this.handleUpdate}
            />
            <SwitchButton
              getValue={getSignInResponse}
              checkValue={SIGN_IN_RESPONSE_CHANGE_PASSWORD}
              setValue={setSignInResponse}
              label="Change PWD"
              update={this.handleUpdate}
            />
            <SwitchButton
              getValue={getSignInResponse}
              checkValue={SIGN_IN_RESPONSE_USER_NOT_FOUND}
              setValue={setSignInResponse}
              label="Not Found"
              update={this.handleUpdate}
            />
            <SwitchButton
              getValue={getSignInResponse}
              checkValue={SIGN_IN_RESPONSE_NOT_AUTHORIZED}
              setValue={setSignInResponse}
              label="Not Auth"
              update={this.handleUpdate}
            />
            <SwitchButton
              getValue={getSignInResponse}
              checkValue={SIGN_IN_RESPONSE_NOT_CONFIRMED}
              setValue={setSignInResponse}
              label="Not Confirmed"
              update={this.handleUpdate}
            />
          </div>
          <div>Resend Code</div>
          <div>
            <SwitchButton
              getValue={getResendValidationCodeResponse}
              checkValue={RESEND_VALIDATION_CODE_RESPONSE_SENDING_SUCCESS}
              setValue={setResendValidationCodeResponse}
              label="Success"
              update={this.handleUpdate}
            />
            <SwitchButton
              getValue={getResendValidationCodeResponse}
              checkValue={RESEND_VALIDATION_CODE_RESPONSE_SENDING_ERROR}
              setValue={setResendValidationCodeResponse}
              label="Error"
              update={this.handleUpdate}
            />
          </div>
        </div>
      </div>
    )
  }
}
