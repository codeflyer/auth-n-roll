import React from 'react'
import { withFormik } from 'formik'
import { withAuthNRoll, FormContext } from '../contexts'

import {
  AuthNRollFormFieldPassword,
  AuthNRollFormButtonSubmit
} from '../consumers'

import { SignIn } from '../pages/SignIn'
import {
  CHANGE_PASSWORD_FORCED_USER_NOT_FOUND,
  CHANGE_PASSWORD_FORCED_ERROR,
  CHANGE_PASSWORD_FORCED_INVALID_PASSWORD
} from '../constants'

export const SignInChangePassword = withFormik({
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
    try {
      const result = await props.authNRoll.authService.changePasswordForced(
        props.authNRoll.user.username,
        values.password,
        props.authNRoll.challenge.Session
      )

      props.authNRoll.setUserData(result.user)
      props.authNRoll.setChallenge(null)
      props.authNRoll.setIsLoggedIn(true)
    } catch (e) {
      setSubmitting(false)
      switch (e.code) {
        case CHANGE_PASSWORD_FORCED_USER_NOT_FOUND:
          props.authNRoll.setUserData(null)
          props.authNRoll.switch.changeIndex(SignIn.FLOW_STEP_CREDENTIAL)
          return
        default:
          setErrors({ password: e.message })
      }
    }
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
