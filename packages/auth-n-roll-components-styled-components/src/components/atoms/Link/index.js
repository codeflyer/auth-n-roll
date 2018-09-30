import { Link as RputerLink} from 'react-router-dom'
import styled from 'styled-components'
import { fontSize, color } from 'styled-system'

import theme from '../../../theme'

export const Link = styled(RputerLink)`
  ${fontSize} ${color}

  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

Link.defaultProps = {
  color: theme.colors.darkGreen
}
