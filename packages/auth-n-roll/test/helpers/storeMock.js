import { Store } from '../../src/store'

export const createStore = ({ authService = {}, initialValues } = {}) => {
  let state = {}
  let store

  const setState = newState => (state = Object.assign({}, state, newState))
  const getState = () => state

  store = new Store({
    authService,
    getState: getState,
    onStateUpdate: setState
  })

  setState({ actions: store.getActions() })
  store.updateState(initialValues || store.getDefaultState())

  return store
}
