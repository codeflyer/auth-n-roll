import React from 'react'
import { withFormik } from 'formik'
import { withAuthNRoll, FormContext } from '../contexts'

import { AuthNRollFormFieldPassword, AuthNRollFormButtonSubmit } from '../consumers'

import {SignIn} from '../pages/SignIn'

export const SignInChangePassword = withFormik({
  mapPropsToValues: props => ({}),
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
  // Submission handler
  handleSubmit: (
    values,
    {
      props,
      setSubmitting,
      setErrors /* setValues, setStatus, and other goodies */
    }
  ) => {
    // Auth.completeNewPassword(props.user, values.password)
    //   .then(result => {
    //     setSubmitting(false)
    //     Hub.dispatch('auth', { event: 'signIn', data: result }, 'Auth')
    //
    //     props.onChangePassword && props.onChangePassword(result)
    //   })
    //   .catch(err => {
    //     setSubmitting(false)
    //     setErrors({ password: err.message })
    //   })
  }
})

export const SignInChangePasswordForm = withAuthNRoll(
  SignInChangePassword(props => (
    <FormContext.Provider value={props}>
      <form onSubmit={props.handleSubmit}>{props.children}</form>
    </FormContext.Provider>
  ))
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
