import { Store } from '../../src/store'

export const createStore = ({ authService = {}, initialValues } = {}) => {
  let state = {}

  const setState = newState => (state = Object.assign({}, state, newState))
  const getState = () => state

  const store = new Store({
    authService,
    getState: getState,
    onStateUpdate: setState
  })

  setState({ actions: store.getActions() })
  store.updateState(initialValues || store.getDefaultState())

  return store
}
