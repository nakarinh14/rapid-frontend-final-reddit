import { firebase } from '../firebase'
import 'firebase/auth'

export default ({ store }) => {
  // Tell the application what to do when the
  // authentication state has changed
  firebase.auth().onAuthStateChanged((user) => {
    console.log('changing state')
    store.dispatch('auth/setUser', user)
  }, (error) => {
    console.error(error)
  })
}
