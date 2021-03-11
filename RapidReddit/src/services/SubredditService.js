import {firebase} from '../firebase'




export function getRefForSubreddits() {
    return firebase.database().ref('subreddits')
}

export function getRefForSubreddit(subredditId) {
     const ref = firebase.database().ref('subreddits/' + subredditId)
     var data;
     ref.on('value', snapshot => {
        data = snapshot.val();
        window.console.log("data: ")
        window.console.log(data)
    })
    return data
}

export function getMetaForSubreddit(subredditId) {
    const ref = firebase.database().ref('subreddits/' + subredditId + "/meta")
     var data;
     ref.on('value', snapshot => {
        data = snapshot.val();
        window.console.log("data: ")
        window.console.log(data)
    })
    return data
}

export function getPostsForSubreddit(subredditId) {
    return firebase.database().ref('subreddits/' + subredditId)
}