import React from 'react'

import { connect } from 'react-redux'

import { AuthNRollProvider } from 'auth-n-roll'
import { SignInPage, SignUpPage } from 'auth-n-roll-components-material-ui'
import { ServiceCognito } from 'auth-n-roll-service-cognito'

import stackData from '../../../../data/stack'
import {appSignInCancel, appSignUpCancel} from '../store/app/actions'

const AppAuth = (props) => {
  return (
    <AuthNRollProvider
      authService={ServiceCognito(stackData)}
      onSignInCancel={props.onSignInCancel}
      onSignUpCancel={props.onSignUpCancel}
      signInFlowComponent={SignInPage}
      signUpFlowComponent={SignUpPage}
    >
      {props.children}
    </AuthNRollProvider>
  )
}

const mapDispatchToProps = dispatch => ({
  onSignInCancel: () => dispatch(appSignInCancel()),
  onSignUpCancel: () => dispatch(appSignUpCancel())
})

export default connect(null, mapDispatchToProps)(AppAuth)
