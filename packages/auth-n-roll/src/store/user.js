export function getDefaultState() {
  return {
    isLoggedIn: false,
    user: null,
    challenge: {}
  }
}

function setIsLoggedIn(isLoggedIn) {
  this.updateState({
    isLoggedIn
  })
}

function setUserData(user) {
  this.updateState({ user })
}

function setChallenge(challenge) {
  this.updateState({ challenge })
}

export function getActions(store) {
  return {
    setUserData: setUserData.bind(store),
    setChallenge: setChallenge.bind(store),
    setIsLoggedIn: setIsLoggedIn.bind(store)
  }
}

export const isLoggedIn = (state) => state.isLoggedIn
export const getUser = (state) => state.user
export const getChallenge = (state) => state.challenge
