import TextFieldMUI from '@material-ui/core/TextField'

import createComponent from './createComponent'

export const TextField = createComponent(
  TextFieldMUI,
  ({
    field,
    form: { touched, errors, isSubmitting },
    disabled = false,
    ...props
  }) => {
    const { name } = field

    return {
      ...props,
      ...field,
      error: touched[name] && !!errors[name],
      helperText: errors[name] ? errors[name] : props.helperText,
      disabled: isSubmitting || disabled
    }
  }
)
