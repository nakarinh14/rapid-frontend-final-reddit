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
<<<<<<< HEAD
    const ref = firebase.database().ref(`subreddits`).push({
            name: subredditName,
            creator: user,
=======
<<<<<<< HEAD
    var obj = {
        name: subredditName, 
        creator: user, 
        date_created: timestamp, 
        subscribers: 1, 
        description: description,
    }

    var subredditId = firebase.database().ref('subreddits').push(obj).key
    SubredditUserService.updateSubredditUserRole(subredditId, "user", "admin")

}
=======
    const ref = firebase.database().ref(`subreddits`).push({
            name: subredditName,
            user,
>>>>>>> 40c3236c2cefbe3fb94ae3e98f782d6f04efb48f
            date_created: timestamp,
            subscribers: 1,
            description: description
    })
    return ref.key
}
<<<<<<< HEAD
=======
>>>>>>> 1d08a5087463936853af681c51af9b2771bfbf52
>>>>>>> 40c3236c2cefbe3fb94ae3e98f782d6f04efb48f
