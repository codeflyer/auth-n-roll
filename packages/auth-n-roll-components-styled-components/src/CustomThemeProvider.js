import React from 'react'
import styled, { ThemeProvider, injectGlobal } from 'styled-components'

import theme from './theme'

injectGlobal`body {
  margin: 0;
}`

export const Base = styled.div`
  font-family: ${props => props.theme.font};
  line-height: 1.4;

  * {
    box-sizing: border-box;
  }
`

export const CustomThemeProvider = props => {
  return (
    <ThemeProvider theme={theme}>
      <Base {...props} />
    </ThemeProvider>
  )
}
