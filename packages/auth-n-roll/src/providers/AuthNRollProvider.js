import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
// import storage from 'adapters/storage'

import { AuthNRollContext } from '../contexts'
import { DebugPanel } from '../components/DebugPanel'

const LOGGED_USER_KEY = 'logged_user_key'

export class AuthNRollProvider extends React.Component {
  constructor(props) {
    super(props)
    this.handleChangeIndex = this.handleChangeIndex.bind(this)
    this.state = {
      authService: props.authService,
      debug: props.debug,
      isInitialized: false,
      isLoggedIn: false,
      user: null,
      setUserData: this.handleSetUserData.bind(this),
      switch: {
        index: null,
        changeIndex: this.handleChangeIndex
      }
    }

    if (props.authService && props.authService.getLoggedUser) {
      const user = props.authService.getLoggedUser()
      this.state.user = user
      this.state.isLoggedIn = !!user
    }
  }

  handleChangeIndex(newIndex) {
    this.setState({
        switch: {
          index: newIndex,
          changeIndex: this.handleChangeIndex
        }
      }
    )
  }

  handleSetUserData(user) {
    // storage.set(LOGGED_USER_KEY, user)
    this.setState({ isInitialized: true, isLoggedIn: true, user })
  }

  componentDidMount() {
    return
    console.log('AuthNRollProvider')
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
        {this.props.debug && <DebugPanel/>}
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

