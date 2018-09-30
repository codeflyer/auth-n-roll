import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'

import reducers from './reducers'
import sagas from './sagas'

const sagaMiddleware = createSagaMiddleware()

const configureStore = ({
  initialState,
  history,
  additionalMiddlewares = []
}) => {
  const middleware = [
    routerMiddleware(history),
    sagaMiddleware,
    ...additionalMiddlewares
  ]

  if (__DEV__) {
    const createLogger = require('redux-logger').createLogger
    middleware.push(createLogger({ collapsed: true }))
  }

  const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(...middleware))
  )

  sagaMiddleware.run(sagas)

  // FIXME the module.hot is not set from the jest test
  /* istanbul ignore if  */
  if (module.hot) {
    module.hot.accept('store/reducers', () => {
      store.replaceReducer(reducers)
    })
  }

  return store
}

export { configureStore }
