export function setUser ({ commit }, user) {
  let obj = null
  if (user) {
    const displayName = user.displayName
    const uid = user.uid
    obj = { displayName, uid }
  }

  commit('updateUserSession', obj)
}
