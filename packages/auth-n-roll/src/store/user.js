export function getDefaultState() {
  return {
    isLoggedIn: false,
    user: null
  }
}

async function setLoggedInUser(user) {
  await this.updateState({
    user,
    isLoggedIn: true,
    signIn: Object.assign({}, this.state.signIn, {
      challenge: null
    })
  })
  storeUser(user)
}

function setUser(user) {
  this.updateState({ user })
}

export function getActions(store) {
  return {
    setUser: setUser.bind(store),
    setLoggedInUser: setLoggedInUser.bind(store),
    rehydrateUser: rehydrateUser.bind(store),
    storeUser: storeUser.bind(store)
  }
}

async function rehydrateUser() {
  if(!window.localStorage)
    return

  const result = window.localStorage.getItem('auth-n-roll-user')
  if (result && this.actions) {
    const user = JSON.parse(result)
    // TODO CHECK IF THE USER IS VALID
    this.updateState({
      user,
      isLoggedIn: true,
      signIn: Object.assign({}, this.state.signIn, {
        challenge: null
      })
    })
  }
}

async function storeUser(user) {
  if(!window.localStorage)
    return

  window.localStorage.setItem('auth-n-roll-user', JSON.stringify(user))
}

export const isLoggedIn = state => state.isLoggedIn
export const getUser = state => state.user
