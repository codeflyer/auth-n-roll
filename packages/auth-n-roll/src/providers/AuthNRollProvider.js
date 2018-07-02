import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'

import { AuthNRollContext } from '../contexts'
import { DebugPanel } from '../components/DebugPanel'

import { Store } from '../store'

const LOGGED_USER_KEY = 'logged_user_key'

export class AuthNRollProvider extends React.Component {
  constructor(props) {
    super(props)
    this.store = new Store({
      getState: this.getState.bind(this),
      onStateUpdate: this.onStateUpdate.bind(this),
      authService: this.props.authService,
      debug: this.props.debug
    })
    this.state = {
      state: this.store.getDefaultState(),
      actions: {
        ...this.store.getActions(),
        loginCancel: props.onLoginCancel
      }
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

  render() {
    return (
      <AuthNRollContext.Provider value={this.state}>
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
