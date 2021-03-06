import React from 'react'
import PropTypes from 'prop-types'

import { withAuthNRoll } from '../contexts'
import { isLoggedIn, getCurrentFlowAction } from '../store/selectors'

class AuthProtectedBase extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  renderRehydratePage() {
    const RehydrateMessageComponent = this.props.rehydrateMessageComponent
    return RehydrateMessageComponent ? (
      <RehydrateMessageComponent onSignInCancel={this.props.onSignInCancel} />
    ) : (
      <div>Rehydrating...</div>
    )
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const isLogged = isLoggedIn(nextProps.authNRoll)
    return {
      isLoggedIn: isLogged,
      requireLogin: !isLogged
    }
  }

  componentDidMount() {
    if (this.state.requireLogin && !getCurrentFlowAction(this.props.authNRoll)) {
      this.props.authNRollActions.requestSignIn()
    }
  }

  componentDidUpdate() {
    if (this.state.requireLogin && !getCurrentFlowAction(this.props.authNRoll)) {
      this.props.authNRollActions.requestSignIn()
    }
  }

  componentWillUnmount() {
    this.props.authNRollActions.resetFlows()
  }

  render() {
    const {isLoggedIn} = this.state
    const {forceChildrenRender, children} = this.props
    if (!isLoggedIn && !forceChildrenRender) {
      return false
    }
    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    )
  }
}

AuthProtectedBase.propTypes = {
  forceChildrenRender: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  authNRoll: PropTypes.object
}

export const AuthProtected = withAuthNRoll(AuthProtectedBase)
