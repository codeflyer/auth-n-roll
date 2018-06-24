import React from 'react'
import { withFormik } from 'formik'
import { withAuthNRoll, FormContext } from '../contexts'

import { getUser, getChallenge, getAuthService } from '../store/selectors'

import {
  AuthNRollFormFieldPassword,
  AuthNRollFormButtonSubmit
} from '../consumers'

import { SignIn } from '../pages/SignIn'
import {
  USER_NOT_FOUND_ERROR,
  GENERIC_ERROR,
  INVALID_PASSWORD_ERROR
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
    const user = getUser(props.authNRoll)
    try {
      const result = await getAuthService(props.authNRoll).changePasswordForced(
        user.username,
        values.password,
        getChallenge(props.authNRoll).Session
      )

      props.authNRollActions.setUser(result.user)
      props.authNRollActions.setChallenge(null)
      props.authNRollActions.setIsLoggedIn(true)
    } catch (e) {
      setSubmitting(false)
      switch (e.code) {
        case USER_NOT_FOUND_ERROR:
          props.authNRollActions.setSignInError({message: `The user ${user.username} was not found`})
          props.authNRollActions.setUser(null)
          props.authNRollActions.changeFlowIndex(SignIn.FLOW_STEP_ERROR_AND_RELOGIN)
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
