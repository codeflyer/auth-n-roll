import { getCurrentFlowIndex } from '../../src/store/flows'
import { createStore } from '../helpers/storeMock'

describe('Store/flows', () => {
  test('Defaults', () => {
    const store = createStore()
    expect(getCurrentFlowIndex(store.state)).toBeNull()
  })

  test('changeFlowIndex', () => {
    const store = createStore()
    store.actions.changeFlowIndex('new-index')
    expect(getCurrentFlowIndex(store.state)).toBe('new-index')
  })
})
