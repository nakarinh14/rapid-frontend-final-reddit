import { firebase } from '../firebase'
import * as SubredditUserService from '../services/SubredditUserService'

function generateSubreaditObj (name, creator, description) {
  const dateCreated = new Date().getTime()
  return {
    name,
    creator,
    date_created: dateCreated,
    subscribers: 1,
    description: description
  }
}

export function getRefForSubreddits () {
  return firebase.database().ref('subreddits')
}

export function getRefForSubreddit (subreaditName) {
  return firebase.database().ref('subreddits/' + subreaditName)
}

export function addNewSubreddit (subredditName, user, description) {
  const subreaditObj = generateSubreaditObj(subredditName, user.displayName, description)
  return Promise.all([
    firebase.database().ref(`subreddits/${subredditName}`).set(subreaditObj),
    SubredditUserService.updateSubredditUserRole(subredditName, user.displayName, 'admin')
  ])
}
