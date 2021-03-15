import {firebase} from '../firebase'




export function getRefForSubreddits() {
    return firebase.database().ref('subreddits')
}

export function getRefForSubreddit(subredditId) {
     return firebase.database().ref('subreddits/' + subredditId)

   
}

export function addNewSubreddit(subredditName, user, description){
    const timestamp = new Date().getTime()
    var obj = {
        name: subredditName, 
        creator: user, 
        date_created: timestamp, 
        subscribers: 1, 
        description: description,
    }

    obj[user] = admin
    const ref = firebase.database().ref(`subreddits`).push(obj)
    return ref.key
}