import { Store } from '../../src/store'
import { getCurrentFlowIndex } from '../../src/store/flows'

describe('Store/flows', () => {
  let state
  let store
  const setState = newState => (state = Object.assign({}, state, newState))
  const getState = () => state

  beforeEach(() => {
    state = {}
    store = new Store({
      authService: {},
      getState: getState,
      onStateUpdate: setState
    })
    store.updateState(store.getDefaultState())
  })

  test('Defaults', () => {
    expect(getCurrentFlowIndex(store.state)).toBeNull()
  })

  test('changeFlowIndex', () => {
    store.state.changeFlowIndex('new-index')
    expect(getCurrentFlowIndex(store.state)).toBe('new-index')
  })
})
