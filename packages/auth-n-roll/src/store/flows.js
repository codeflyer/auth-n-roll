export function getDefaultState() {
  return {
    flows: {
      index: null
    }
  }
}

function changeFlowIndex(newIndex) {
  this.updateState({
    flows: {
      index: newIndex
    }
  })
}

export function getActions(store) {
  return {
    changeFlowIndex: changeFlowIndex.bind(store)
  }
}

export const getCurrentFlowIndex = (state) => state.flows.index

