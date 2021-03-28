import { firebase } from '../firebase'

export function getRefForSubreddits () {
  return firebase.database().ref('subreddits')
}

export function getRefForSubreddit (subredditId) {
  return firebase.database().ref('subreddits/' + subredditId)
}
