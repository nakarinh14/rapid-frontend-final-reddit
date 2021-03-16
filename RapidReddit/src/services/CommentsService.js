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
        commentPath = `/${commentPath}`
        console.log("Formatted comment path:",commentPath)
    }
    const ref = firebase.database().ref(`comments/${postId}${commentPath || ''}`).push(commentItem)
    await increaseCommentCounter(postId)
    return ref.key
}

export function getCommentsRef(postId) {
    return firebase.database().ref(`comments/${postId}`)
}
