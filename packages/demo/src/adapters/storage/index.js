const storage = {
  set: (key, values) => {
    sessionStorage.setItem(key, JSON.stringify(values))
  },
  get: key => {
    const value = sessionStorage.getItem(key)
    return value ? JSON.parse(value) : null
  },
  exists: key => {
    return !!sessionStorage.getItem(key)
  },
  remove: key => {
    sessionStorage.removeItem(key)
  }
}

export default storage
