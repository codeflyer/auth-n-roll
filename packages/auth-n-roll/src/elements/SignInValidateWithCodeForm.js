import React from 'react'
import { withFormik } from 'formik'
import { withAuthNRoll, FormContext } from '../contexts'
import { AuthNRollFormField, AuthNRollFormButtonSubmit } from '../consumers'

export const SignInValidateWithCode = withFormik({
  mapPropsToValues: props => ({}),
  validate: (values, props) => {
    const errors = {}

    if (!values.code) {
      errors.code = 'Required'
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

export const SignInValidateWithCodeForm = withAuthNRoll(SignInValidateWithCode(props => (
  <FormContext.Provider value={props}>
    <form onSubmit={props.handleSubmit}>{props.children}</form>
  </FormContext.Provider>
)))

SignInValidateWithCodeForm.FieldValidationCode = ({ children }) => (
  <AuthNRollFormField id="code">{children}</AuthNRollFormField>
)
SignInValidateWithCodeForm.ButtonSubmit = ({ children }) => (
  <AuthNRollFormButtonSubmit>{children}</AuthNRollFormButtonSubmit>
)
