import React from 'react'
import { withFormik } from 'formik'
import { withAuthNRoll, FormContext } from '../contexts'
import { AuthNRollFormField, AuthNRollFormButtonSubmit } from '../consumers'
import {
  CONFIRM_SIGN_UP_USER_NOT_FOUND,
  CONFIRM_SIGN_UP_CODE_MISMATCH,
  CONFIRM_SIGN_UP_EXPIRED_CODE
} from '../constants'
import { SignIn } from '../pages/SignIn'
import { getUser } from '../store/selectors'

export const SignInConfirmSignUp = withFormik({
  mapPropsToValues: props => ({}),
  validate: (values, props) => {
    const errors = {}

    if (!values.code) {
      errors.code = 'Required'
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
      setSubmitting(true)
      const result = await getAuthService(props.authNRoll).confirmSignUp(
        getUser(props.authNRoll).username,
        values.code
      )
      setSubmitting(false)

      // DO THE RIGHT REDIRECT

      console.log('Redirect to the right panel')
    } catch (e) {
      setSubmitting(false)
      switch (e.code) {
        case CONFIRM_SIGN_UP_USER_NOT_FOUND:
          props.authNRoll.setSignInError({
            code: CONFIRM_SIGN_UP_USER_NOT_FOUND,
            message: `The user ${getUser(props.authNRoll).username} was not found`
          })
          props.authNRoll.setUserData(null)
          props.authNRoll.changeFlowIndex(SignIn.FLOW_STEP_ERROR_AND_RELOGIN)
          return
        case CONFIRM_SIGN_UP_CODE_MISMATCH:
        case CONFIRM_SIGN_UP_EXPIRED_CODE:
          setErrors({ code: e.message })
          break
        default:
          setErrors({ code: e.message })
      }
    }
  }
})

export const SignInConfirmSignUpForm = withAuthNRoll(
  SignInConfirmSignUp(props => (
    <FormContext.Provider value={props}>
      <form onSubmit={props.handleSubmit}>{props.children}</form>
    </FormContext.Provider>
  ))
)

SignInConfirmSignUpForm.FieldValidationCode = ({ children }) => (
  <AuthNRollFormField id="code">{children}</AuthNRollFormField>
)
SignInConfirmSignUpForm.ButtonSubmit = ({ children }) => (
  <AuthNRollFormButtonSubmit>{children}</AuthNRollFormButtonSubmit>
)
