import React from 'react'
import { withFormik } from 'formik'
import get from 'lodash/get'
import { sprintf } from 'sprintf-js'

import {
  AuthNRollFormField,
  AuthNRollFormFieldPassword,
  AuthNRollFormButtonSubmit,
  AuthNRollFormButtonOnClick
} from '../consumers'
import { USERNAME_EXISTS_ERROR, INVALID_PASSWORD_ERROR } from '../constants'
import { SignUp } from '../pages/SignUp'
import { withAuthNRoll, FormContext } from '../contexts'

export const SignUpCredentialsWithFormik = withFormik({
  mapPropsToValues: props => ({
    email: get(props, 'initialValues.email', ''),
    password: get(props, 'initialValues.password', ''),
    passwordConfirm: get(props, 'initialValues.passwordConfirm', '')
  }),
  validate: (values, props) => {
    const errors = {}
    if (!values.email) {
      errors.email = 'Required'
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address'
    }
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
  // Submission handler
  handleSubmit: async (
    values,
    {
      props,
      setSubmitting,
      setErrors /* setValues, setStatus, and other goodies */
    }
  ) => {
    try {
      const result = await props.authNRollActions.signUp(values)
      setSubmitting(false)

      props.authNRollActions.setSignUpUser({ username: values.email })
      props.authNRollActions.setSignUpResult(result)
      props.authNRollActions.changeFlowIndex(SignUp.FLOW_STEP_CONFIRM_CODE)
    } catch (e) {
      setSubmitting(false)
      if (e.code === INVALID_PASSWORD_ERROR) {
        setErrors({ password: sprintf(props.authNRoll.labels[e.message]) })
        return
      }
      if (e.code === USERNAME_EXISTS_ERROR) {
        setErrors({ email: sprintf(props.authNRoll.labels[e.message]) })
        return
      }
      setErrors({
        email: sprintf(props.authNRoll.labels[e.message], { user: e.user })
      })
    }
  }
})

class SignUpCredentialFormBase extends React.Component {
  constructor(props) {
    super(props)

    this.handleCancel = this.handleCancel.bind(this)
    this.handleRequestSignIn = this.handleRequestSignIn.bind(this)
  }

  handleCancel() {
    this.props.authNRollActions.signUpCancel()
  }

  handleRequestSignIn() {
    this.props.authNRollActions.requestSignIn()
  }

  render() {
    return (
      <FormContext.Provider
        value={Object.assign({}, this.props, {
          onCancel: this.handleCancel,
          onRequestSignIn: this.handleRequestSignIn
        })}
      >
        <form onSubmit={this.props.handleSubmit}>{this.props.children}</form>
      </FormContext.Provider>
    )
  }
}

export const SignUpCredentialForm = withAuthNRoll(
  SignUpCredentialsWithFormik(SignUpCredentialFormBase)
)

SignUpCredentialForm.FieldUsername = ({ children }) => (
  <AuthNRollFormField id='email'>{children}</AuthNRollFormField>
)
SignUpCredentialForm.FieldPassword = ({ children }) => (
  <AuthNRollFormFieldPassword id='password'>
    {children}
  </AuthNRollFormFieldPassword>
)
SignUpCredentialForm.FieldPasswordConfirm = ({ children }) => (
  <AuthNRollFormFieldPassword id='passwordConfirm'>
    {children}
  </AuthNRollFormFieldPassword>
)
SignUpCredentialForm.ButtonSubmit = ({ children }) => (
  <AuthNRollFormButtonSubmit>{children}</AuthNRollFormButtonSubmit>
)

SignUpCredentialForm.RequestSignIn = ({ children }) => (
  <AuthNRollFormButtonOnClick actionFunctionNameOnState='onRequestSignIn'>
    {children}
  </AuthNRollFormButtonOnClick>
)

SignUpCredentialForm.ButtonCancel = ({ children }) => (
  <AuthNRollFormButtonOnClick actionFunctionNameOnState='onCancel'>
    {children}
  </AuthNRollFormButtonOnClick>
)
