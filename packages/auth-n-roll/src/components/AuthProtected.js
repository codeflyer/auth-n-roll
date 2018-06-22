import React from 'react'
import PropTypes from 'prop-types'

import { withAuthNRoll } from '../contexts'

class AuthProtectedBase extends React.Component {
  renderLoginProcess() {
    const SignInFlowComponent = this.props.signInFlowComponent
    return <SignInFlowComponent />
  }

  render() {
    if (!this.props.authNRoll.isLoggedIn) {
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
  authNRoll: PropTypes.shape({
    isLoggedIn: PropTypes.bool
  })
}

export const AuthProtected = withAuthNRoll(AuthProtectedBase)
