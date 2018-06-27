import React from 'react'

import styled from 'styled-components'
import theme from '../../theme'
import { SignIn } from 'auth-n-roll'
import { SignInCredentials } from '../organisms/SignInCredentials'
import { SignInChangePassword } from '../organisms/SignInChangePassword'
import { SignInConfirmSignUp } from '../organisms/SignInConfirmSignUp'
import { SignInMessageAndRelogin } from '../organisms/SignInMessageAndRelogin'

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: ${theme.colors.gray};
`

const Wrapper = styled.div`
  width: 300px;
`

export class SignInPage extends React.Component {
  render() {
    return (
      <ModalWrapper>
        <Wrapper>
          <SignIn>
            <SignInCredentials index={SignIn.FLOW_STEP_CREDENTIALS} />
            <SignInChangePassword index={SignIn.FLOW_STEP_CHANGE_PASSWORD} />
            <SignInConfirmSignUp index={SignIn.FLOW_STEP_CONFIRM_CODE} />
            <SignInMessageAndRelogin index={SignIn.FLOW_STEP_MESSAGE_AND_RELOGIN} />
          </SignIn>
        </Wrapper>
      </ModalWrapper>
    )
  }
}
