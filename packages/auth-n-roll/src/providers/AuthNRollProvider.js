import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
// import storage from 'adapters/storage'

import { AuthNRollContext } from '../contexts'
import { DebugPanel } from '../components/DebugPanel'
import { SignInResendValidationCode } from '../elements/SignInResendValidationCode'
import {
  RESEND_VALIDATION_CODE_STATE_NOT_REQUESTED,
  RESEND_VALIDATION_CODE_STATE_SENDING,
  RESEND_VALIDATION_CODE_STATE_SENDING_ERROR,
  RESEND_VALIDATION_CODE_STATE_SENDING_SUCCESS
} from '../constants'

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
      challenge: {},
      setUserData: this.handleSetUserData.bind(this),
      setChallenge: this.handleSetChallenge.bind(this),
      setIsLoggedIn: this.handleSetIsLoggedIn.bind(this),
      restartSignIn: this.handleRestartSignIn.bind(this),
      switch: {
        index: null,
        changeIndex: this.handleChangeIndex
      },
      signIn: {
        error: 'Add a default error here',
        setError: this.handleSetError.bind(this, 'signIn')
      },
      resendCode: {
        sendingState: RESEND_VALIDATION_CODE_STATE_NOT_REQUESTED,
        error: null,
        resend: this.handleResendCode.bind(this)
      }
    }

    if (props.authService && props.authService.getLoggedUser) {
      const user = props.authService.getLoggedUser()
      this.state.user = user
      this.state.isLoggedIn = !!user
    }
  }

  async handleResendCode() {
    this.setState({
      resendCode: Object.assign({}, this.state.resendCode, {
        sendingState: RESEND_VALIDATION_CODE_STATE_SENDING,
        error: null
      })
    })

    try {
      await this.state.authService.resendValidationCode(
        this.state.user.username
      )
      this.setState({
        resendCode: Object.assign({}, this.state.resendCode, {
          sendingState: RESEND_VALIDATION_CODE_STATE_SENDING_SUCCESS
        })
      })
    } catch (e) {
      this.setState({
        resendCode: Object.assign({}, this.state.resendCode, {
          sendingState: RESEND_VALIDATION_CODE_STATE_SENDING_ERROR,
          error: e.message
        })
      })
    }
  }

  handleRestartSignIn() {
    this.setState({
      user: null,
      switch: {
        index: null,
        changeIndex: this.handleChangeIndex
      },
      signIn: {
        error: null,
        setError: this.handleSetError.bind(this, 'signIn')
      }
    })
  }

  handleSetIsLoggedIn(isLoggedIn) {
    this.setState({
      isLoggedIn
    })
  }

  handleSetError(flow, error) {
    this.setState({
      [flow]: Object.assign({}, this.state[flow], { error })
    })
  }

  handleChangeIndex(newIndex) {
    this.setState({
      switch: {
        index: newIndex,
        changeIndex: this.handleChangeIndex
      }
    })
  }

  handleSetUserData(user) {
    // storage.set(LOGGED_USER_KEY, user)
    this.setState({ user })
  }

  handleSetChallenge(challenge) {
    // storage.set(LOGGED_USER_KEY, user)
    this.setState({ challenge })
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
