import {firebase} from '../firebase'
import { Subreddit } from '../screens/Subreddit'
import * as SubredditUserService from '../services/SubredditUserService'



export function getRefForSubreddits() {
    return firebase.database().ref('subreddits')
}

export function getRefForSubreddit(subredditId) {
     return firebase.database().ref('subreddits/' + subredditId)
}

export function addNewSubreddit(subredditName, user, description){
    const timestamp = new Date().getTime()
    const ref = firebase.database().ref(`subreddits`).push({
            name: subredditName,
            creator: user,
            date_created: timestamp,
            subscribers: 1,
            description: description
    })
    return ref.key
}
