let cookiePrefix = ''
let refreshFunc
let authService

export function setCookiePrefix(prefix) {
  cookiePrefix = prefix || ''
}

export function setAuthService(service) {
  authService = service
}

export function getDefaultState() {
  return {
    isLoggedIn: false,
    authData: null,
    user: null
  }
}

async function refresh(store, user, authData) {
  if (refreshFunc) clearTimeout(refreshFunc)

  try {
    const result = await authService.refresh(authData.RefreshToken)
    window.localStorage.setItem(
      `${cookiePrefix}auth-n-roll-auth-data`,
      JSON.stringify(result.authData)
    )
    await store.updateState({
      user,
      authData: result.authData,
      isLoggedIn: true,
      signIn: null
    })

    const refreshIn =
      Math.max(
        result.authData.Expires - Math.floor(Date.now() / 1000) - 10,
        10
      ) * 1000
    refreshFunc = setTimeout(
      () => refresh(store, user, result.authData),
      refreshIn
    )
  } catch (e) {
    await store.updateState({
      user: null,
      authData: null,
      isLoggedIn: false,
      signIn: null,
      refreshLastError: e
    })
  }
}

async function setLoggedInUser(user, authData) {
  if (refreshFunc) clearTimeout(refreshFunc)

  await this.updateState({
    user,
    authData,
    isLoggedIn: true,
    signIn: null
  })
  const refreshIn =
    Math.max(
      authData.Expires - Math.floor(Date.now() / 1000) - 10,
      10
    ) * 1000

  refreshFunc = setTimeout(
    () => refresh(this, user, authData),
    refreshIn
  )
  storeUser(user, authData)
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

function rehydrateUser() {
  if (!window.localStorage) return

  try {
    const user = JSON.parse(
      window.localStorage.getItem(`${cookiePrefix}auth-n-roll-user`)
    )
    const authData = JSON.parse(
      window.localStorage.getItem(`${cookiePrefix}auth-n-roll-auth-data`)
    )

    if (!user || !authData) return

    if (authData.Expires && (authData.Expires - Math.floor(Date.now() / 1000) > 0)) {
      return refresh(this, user, authData)
    } else {
      window.localStorage.removeItem(`${cookiePrefix}auth-n-roll-user`)
      window.localStorage.removeItem(`${cookiePrefix}auth-n-roll-auth-data`)
    }
  } catch (e) {}
}

async function storeUser(user, authData) {
  if (!window.localStorage) return

  window.localStorage.setItem(
    `${cookiePrefix}auth-n-roll-user`,
    JSON.stringify(user)
  )
  window.localStorage.setItem(
    `${cookiePrefix}auth-n-roll-auth-data`,
    JSON.stringify(authData)
  )
}

export const isLoggedIn = state => state.isLoggedIn
export const getUser = state => state.user
