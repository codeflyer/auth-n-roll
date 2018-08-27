import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'

import { AuthNRollContext } from '../contexts'
import { DebugPanel } from '../components/DebugPanel'

import { Store } from '../store'
import { FLOW_ACTIONS_SIGNIN, FLOW_ACTIONS_SIGNUP } from '../constants'
import { isLoggedIn, getCurrentFlowAction } from '../store/selectors'

const LOGGED_USER_KEY = 'logged_user_key'

export class AuthNRollProvider extends React.Component {
  constructor(props) {
    super(props)
    this.store = new Store({
      getState: this.getState.bind(this),
      onStateUpdate: this.onStateUpdate.bind(this),
      authService: this.props.authService,
      debug: this.props.debug,
      cookiePrefix: this.props.cookiePrefix,
      props: this.props
    })
    this.state = {
      state: this.store.getDefaultState(),
      actions: {
        ...this.store.getActions(this.props),
      }
    }

    this.state.actions.signInCancel = () => {
      this.state.actions.resetFlows()
      props.onSignInCancel()
    }

    this.state.actions.signUpCancel = () => {
      this.state.actions.resetFlows()
      props.onSignUpCancel()
    }

  }

  getState() {
    return this.state
  }

  async onStateUpdate(newState) {
    return new Promise((resolve, reject) => {
      try {
        this.setState(() => newState, () => resolve(newState))
      } catch (e) {
        reject(e)
      }
    })
  }

  componentDidMount() {
    this.state.actions.rehydrateUser()
  }

  componentDidUpdate() {
    this.store.props = this.props
  }

  renderLoginProcess() {
    const SignInFlowComponent = this.props.signInFlowComponent
    return <SignInFlowComponent onSignInCancel={this.props.onSignInCancel} />
  }

  renderSignupProcess() {
    const SignUpFlowComponent = this.props.signUpFlowComponent
    if(SignUpFlowComponent) {

    return <SignUpFlowComponent />
    } else {
      return <div>NE</div>
    }
  }

  render() {
    const isLogged = isLoggedIn(this.state.state)
    const currentFlowAction = getCurrentFlowAction(this.state.state)

    return (
      <AuthNRollContext.Provider value={this.state}>
        {!isLogged && currentFlowAction === FLOW_ACTIONS_SIGNIN && this.renderLoginProcess()}
        {!isLogged && currentFlowAction === FLOW_ACTIONS_SIGNUP && this.renderSignupProcess()}
        {this.props.children}
        {this.props.debug && <DebugPanel />}
      </AuthNRollContext.Provider>
    )
  }
}

AuthNRollProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
