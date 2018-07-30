import { getDefaultState as getDefaultFlowState } from './flows'
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
    user: null,
    signUpUser: null,
    isRehydrating: false
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
      signUpUser: null,
      authData: result.authData,
      isLoggedIn: true,
      signIn: null,
      isRehydrating: false
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
      signUpUser: null,
      authData: null,
      isLoggedIn: false,
      signIn: null,
      refreshLastError: e,
      isRehydrating: false
    })
  }
}

async function setLoggedInUser(props, user, authData) {
  console.log('setLoggedInUser')
  console.log(props)
  if (refreshFunc) clearTimeout(refreshFunc)

  await this.updateState({
    user,
    authData,
    isLoggedIn: true,
    signIn: null,
    ...getDefaultFlowState()
  })
  const refreshIn =
    Math.max(authData.Expires - Math.floor(Date.now() / 1000) - 10, 10) * 1000

  refreshFunc = setTimeout(() => refresh(this, user, authData), refreshIn)
  storeUser(user, authData)
  props.onSignIn && props.onSignIn({ user, authData })
}

function setUser(user) {
  this.updateState({ user })
}

function setSignUpUser(signUpUser) {
  this.updateState({ signUpUser })
}

async function signOut(props) {
  await authService.signOut()

  if (refreshFunc) clearTimeout(refreshFunc)

  if (window.localStorage) {
    window.localStorage.removeItem(`${cookiePrefix}auth-n-roll-user`)
    window.localStorage.removeItem(`${cookiePrefix}auth-n-roll-auth-data`)
  }

  this.updateState({
    user: null,
    signUpUser: null,
    authData: null,
    isLoggedIn: false,
    signIn: null,
    refreshLastError: null,
    isRehydrating: false
  })

  props.onSignOut && props.onSignOut()
}

export function getActions(store, props) {
  return {
    setUser: setUser.bind(store),
    setSignUpUser: setSignUpUser.bind(store),
    setLoggedInUser: setLoggedInUser.bind(store, props),
    rehydrateUser: rehydrateUser.bind(store),
    storeUser: storeUser.bind(store),
    signOut: signOut.bind(store, props)
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

    this.updateState({ isRehydrating: true })
    if (
      authData.Expires &&
      authData.Expires - Math.floor(Date.now() / 1000) > 0
    ) {
      return refresh(this, user, authData)
    } else {
      window.localStorage.removeItem(`${cookiePrefix}auth-n-roll-user`)
      window.localStorage.removeItem(`${cookiePrefix}auth-n-roll-auth-data`)
    }
  } catch (e) {
    this.updateState({ isRehydrating: false })
  }
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
export const isRehydrating = state => state.isRehydrating
export const getUser = state => state.user
export const getSignUpUser = state => state.signUpUser
