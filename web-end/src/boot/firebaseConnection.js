import { firebase } from '../firebase'
import 'firebase/auth'

export default ({ store }) => {
  // Tell the application what to do when the
  // authentication state has changed
  firebase.auth().onAuthStateChanged((user) => {
    store.commit('auth/updateUserSession', user)
  }, (error) => {
    console.error(error)
  })
}
