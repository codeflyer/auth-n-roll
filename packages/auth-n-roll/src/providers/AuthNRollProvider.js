import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
// import storage from 'adapters/storage'

import { AuthNRollContext } from '../contexts'
import { DebugPanel } from '../components/DebugPanel'

import { Store } from '../store'

const LOGGED_USER_KEY = 'logged_user_key'

export class AuthNRollProvider extends React.Component {
  constructor(props) {
    super(props)
    const store = new Store({
      getState: this.getState.bind(this),
      onStateUpdate: this.onStateUpdate.bind(this),
      authService: this.props.authService,
      debug: this.props.debug
    })
    this.state = store.getDefaultState()

//    if (props.authService && props.authService.getLoggedUser) {
//      const user = props.authService.getLoggedUser()
//      this.state.user = user
//      this.state.isLoggedIn = !!user
//    }
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
    return
    const storedUser = storage.get(LOGGED_USER_KEY)
    const expire = get(storedUser, 'signInUserSession.accessToken.payload')
    if (Number((expire - Date.now() / 1000).toFixed(0)) > 60) {
      // TODO add session refresh here
    } else {
      this.setState({
        isInitialized: true,
        isLoggedIn: true,
        loggedInUser: storedUser
      })
    }
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
