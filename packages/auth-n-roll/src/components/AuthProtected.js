import React from 'react'
import PropTypes from 'prop-types'

import { withAuthNRoll } from '../contexts'
import { isLoggedIn } from '../store/selectors'

class AuthProtectedBase extends React.Component {
  renderLoginProcess() {
    const SignInFlowComponent = this.props.signInFlowComponent
    return <SignInFlowComponent />
  }

  render() {
    if (!isLoggedIn(this.props.authNRoll)) {
      return this.renderLoginProcess()
    }
    return <React.Fragment>{this.props.children}</React.Fragment>
  }
}

AuthProtectedBase.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  authNRoll: PropTypes.object
}

export const AuthProtected = withAuthNRoll(AuthProtectedBase)
