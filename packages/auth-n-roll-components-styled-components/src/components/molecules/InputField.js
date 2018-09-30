import React from 'react'

import { Box } from '../atoms/Box'
import { InputField as InputFieldStyled} from '../atoms/InputField'
import { Icon } from '../atoms/Icon'
import { Input } from '../atoms/Input'
import { Text } from '../atoms/Text'

export const InputField = props => {
  const { authForm, label, placeholder, type, id, iconName } = props
  return (
    <Box mb={3}>
      <InputFieldStyled onChange={authForm.handleChange} onBlur={authForm.handleBlur}>
        <Icon name={iconName} size={22}/>
        <Input
          id={id}
          autoComplete='off'
          color={authForm.touched[id] && authForm.errors[id] ? 'red' : null}
          placeholder={placeholder}
          label={label}
          hasError={authForm.touched[id] && authForm.errors[id]}
          maxLength={60}
          value={authForm.values[id]}
          type={type || authForm.type}
        />
      </InputFieldStyled>
      {authForm.touched[id] && authForm.errors[id] && (
        <Text color='red' fontSize={1} mt={1}>
          {authForm.errors[id]}
        </Text>
      )}
    </Box>
  )
}
