import {firebase} from '../firebase'
import * as SubredditUserService from '../services/SubredditUserService'

function generateSubreaditObj(name, creator, description) {
    const date_created = new Date().getTime()
    return {
        name,
        creator,
        date_created,
        subscribers: 1,
        description: description,
    }
}

export function getRefForSubreddits() {
    return firebase.database().ref('subreddits')
}

export function getRefForSubreddit(subreaditName) {
     return firebase.database().ref('subreddits/' + subreaditName)
}

export function addNewSubreddit(subredditName, user, description){
    getRefForSubreddit(subredditName).get().then((snapshot) => {
        if(!snapshot.exists()){
            const subreaditObj = generateSubreaditObj(subredditName, user.displayName, description)
            return Promise.all([
                firebase.database().ref(`subreddits/${subredditName}`).set(subreaditObj),
                SubredditUserService.updateSubredditUserRole(subredditName, user.displayName, "admin")
            ])
        }
    })
}

