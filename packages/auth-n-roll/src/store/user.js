export function getDefaultState() {
  return {
    isLoggedIn: false,
    user: null
  }
}

function setIsLoggedIn(isLoggedIn) {
  this.updateState({
    isLoggedIn
  })
}

function setUser(user) {
  this.updateState({ user })
}

export function getActions(store) {
  return {
    setUser: setUser.bind(store),
    setIsLoggedIn: setIsLoggedIn.bind(store)
  }
}

export const isLoggedIn = (state) => state.isLoggedIn
export const getUser = (state) => state.user
