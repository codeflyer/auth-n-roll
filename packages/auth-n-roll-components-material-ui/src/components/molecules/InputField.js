import React from 'react'
import { TextField } from '../atoms/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'

export const InputField = props => {
  const {
    authForm,
    label,
    placeholder,
    type,
    id,
    IconComponent,
    required,
    autoComplete
  } = props

  let inputProps = {}
  if (IconComponent) {
    inputProps = {
      startAdornment: (
        <InputAdornment position="start">
          <IconComponent />
        </InputAdornment>
      )
    }
  }

  return (
    <TextField
      form={authForm}
      field={{
        name: id,
        label,
        id,
        required,
        placeholder,
        type: type || authForm.type,
        autoComplete: autoComplete || 'on',
        value: authForm.values[id],
        onChange: authForm.handleChange,
        onBlur: authForm.handleBlur,
        fullWidth: true
      }}
      InputProps={inputProps}
    />
  )
}
