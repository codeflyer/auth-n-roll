import React from 'react'
import PropTypes from 'prop-types'
import createHistory from 'history/createBrowserHistory'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import logger from '../adapters/logger'
import { appInit } from '../store/app/actions'
import { configureStore } from '../store'

import AppAuth from './AppAuth'

const history = createHistory({ basename: '/' })
const store = configureStore({
  initialState: undefined,
  history
})

store.dispatch(appInit())

class AppContainer extends React.Component {
  componentDidCatch(error, errorInfo) {
    logger.captureException(error, errorInfo)
  }

  render() {
    return (
      <Provider store={store}>
        <AppAuth>
          <ConnectedRouter history={history}>
            {this.props.children}
          </ConnectedRouter>
        </AppAuth>
      </Provider>
    )
  }
}

AppContainer.propTypes = {
  children: PropTypes.element.isRequired
}

export default AppContainer
