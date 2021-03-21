import {firebase} from '../firebase'
import {increaseCommentCounter} from './PostService'

export async function addComment(postId, comment, user, commentPath) {
    if(!user) throw Error("Trying to add comment but no user found. Maybe user is not logged in?")

    const commentItem = {
        timestamp: new Date().getTime(),
        user: user,
        body: comment,
        upvotes: 1,
    }

    if(!postId) throw Error(`Trying to create comment but postId is undefined`)
    if(commentPath) {
        if(commentPath[-1] !== '/') commentPath = `${commentPath}/`
        if(commentPath[0] === '/') commentPath = commentPath.slice(1,-1)
        console.log(commentPath)
        commentPath = commentPath.replace(/\//g,'/comments/')
        console.log("Formatted comment path:",commentPath)
    }
    if(!comment) throw Error("Comment is empty")

    const path = `comments/${postId}/${commentPath || ''}`
    const newPostRef = firebase.database().ref(path).push()
    const postKey = newPostRef.key
    const newData = {};
    // Use set to atomically update multiple data path
    newData[`${path}/${postKey}`] = commentItem
    //TODO Would be nice if can include subreddit and post title. To display in user profile
    newData[`user_profile/${user}/comments/${postKey}`] = true //TODO Should be assign to an object of its own for faster query.
    await firebase.database().ref().update(newData)
    await increaseCommentCounter(postId)

    return postKey
}

export function getCommentsRef(postId) {
    return firebase.database().ref(`comments/${postId}`)
}
