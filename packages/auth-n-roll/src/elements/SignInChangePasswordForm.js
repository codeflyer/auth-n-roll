import React from 'react'
import { withFormik } from 'formik'
import { withAuthNRoll, FormContext } from '../contexts'

import { getUser, getChallenge } from '../store/selectors'

import {
  AuthNRollFormFieldPassword,
  AuthNRollFormButtonSubmit,
  AuthNRollFormButtonOnClick
} from '../consumers'

import { SignIn } from '../pages/SignIn'
import {
  USER_NOT_FOUND_ERROR,
  GENERIC_ERROR,
  INVALID_PASSWORD_ERROR
} from '../constants'

export const SignInChangePasswordWithFormik = withFormik({
  mapPropsToValues: props => ({
    password: 'Davide12345',
    passwordConfirm: 'Davide12345'
  }),
  validate: (values, props) => {
    const errors = {}

    if (!values.password) {
      errors.password = 'Required'
    }

    if (!values.passwordConfirm) {
      errors.passwordConfirm = 'Required'
    }

    if (
      values.password &&
      values.passwordConfirm &&
      values.password !== values.passwordConfirm
    ) {
      errors.passwordConfirm = "The password don't match"
    }
    return errors
  },
  handleSubmit: async (
    values,
    {
      props,
      setSubmitting,
      setErrors /* setValues, setStatus, and other goodies */
    }
  ) => {
    const user = getUser(props.authNRoll)
    try {
      const result = await props.authNRollActions.changePasswordForced(
        user.username,
        values.password,
        getChallenge(props.authNRoll).Session
      )

      props.authNRollActions.setLoggedInUser(result.user)
    } catch (e) {
      setSubmitting(false)
      switch (e.code) {
        case USER_NOT_FOUND_ERROR:
          props.authNRollActions.setSignInMessage({
            message: `The user ${user.username} was not found`,
            type: 'error',
            from: 'change-password-forced'
          })
          props.authNRollActions.setUser(null)
          props.authNRollActions.changeFlowIndex(SignIn.FLOW_STEP_MESSAGE_AND_RELOGIN)
          return
        default:
          setErrors({ password: e.message })
      }
    }
  }
})

class SignInChangePasswordFormBase extends React.Component {
  constructor(props) {
    super(props)

    this.handleCancel = this.handleCancel.bind(this)
  }

  handleCancel() {
    this.props.authNRollActions.loginCancel()
  }

  render() {
    return (
      <FormContext.Provider
        value={Object.assign({}, this.props, { onCancel: this.handleCancel })}
      >
        <form onSubmit={this.props.handleSubmit}>{this.props.children}</form>
      </FormContext.Provider>
    )
  }
}

export const SignInChangePasswordForm = withAuthNRoll(
  SignInChangePasswordWithFormik(SignInChangePasswordFormBase)
)

SignInChangePasswordForm.FieldPassword = ({ children }) => (
  <AuthNRollFormFieldPassword id="password">
    {children}
  </AuthNRollFormFieldPassword>
)

SignInChangePasswordForm.FieldPasswordConfirm = ({ children }) => (
  <AuthNRollFormFieldPassword id="passwordConfirm">
    {children}
  </AuthNRollFormFieldPassword>
)

SignInChangePasswordForm.ButtonSubmit = ({ children }) => (
  <AuthNRollFormButtonSubmit>{children}</AuthNRollFormButtonSubmit>
)

SignInChangePasswordForm.ButtonCancel = ({ children }) => (
  <AuthNRollFormButtonOnClick actionFunctionNameOnState="onCancel">
    {children}
  </AuthNRollFormButtonOnClick>
)
