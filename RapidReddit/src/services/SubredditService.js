import {firebase} from '../firebase'
<<<<<<< HEAD
import { Subreddit } from '../screens/Subreddit'
import * as SubredditUserService from '../services/SubredditUserService'


=======
>>>>>>> 1d08a5087463936853af681c51af9b2771bfbf52

export function getRefForSubreddits() {
    return firebase.database().ref('subreddits')
}

export function getRefForSubreddit(subredditId) {
     return firebase.database().ref('subreddits/' + subredditId)
}

export function addNewSubreddit(subredditName, user, description){
    const timestamp = new Date().getTime()
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
            date_created: timestamp,
            subscribers: 1,
            description: description
    })
    return ref.key
}
>>>>>>> 1d08a5087463936853af681c51af9b2771bfbf52
