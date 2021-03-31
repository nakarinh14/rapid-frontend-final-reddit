export function setUser ({ commit }, user) {
  let obj = null
  if (user) {
    const displayName = user.displayName
    const uid = user.uid
    const email = user.email
    obj = { displayName, uid, email }
  }

  commit('updateUserSession', obj)
}
