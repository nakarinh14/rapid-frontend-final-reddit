import {firebase} from '../firebase'
import {increaseCommentCounter} from './PostService'

function parseCommentPath(commentPath) {
    if(commentPath[0] === '/') commentPath = commentPath.slice(1)
    // console.log(commentPath)
    commentPath = commentPath.replace(/\//g,'/comments/')
    // console.log("Formatted comment path:",commentPath)
    return commentPath || ''
}

async function createNewComment(postId, comment, user, commentPath) {
    if(commentPath) commentPath = `${parseCommentPath(commentPath)}/comments/`
    const commentItem = {
        timestamp: new Date().getTime(),
        user: {
            displayName: user.displayName,
            uid: user.uid
        },
        body: comment,
        upvotes: 0,
    }
    // console.log(commentItem)
    const path = `comments/${postId}/${commentPath || ''}`
    const newPostRef = firebase.database().ref(path).push()
    const postKey = newPostRef.key
    const newData = {};
    // Use set to atomically update multiple data path
    newData[`${path}/${postKey}`] = commentItem
    //TODO Would be nice if can include subreddit and post title. To display in user profile
    newData[`user_profile/${user.uid}/comments/${postKey}`] = true //TODO Should be assign to an object of its own for faster query.
    await firebase.database().ref().update(newData)
    return postKey
}

/**
 * Add a comment
 * @param postId ID of the post
 * @param comment The contents of the comment
 * @param user The user object (Must contain displayName and uid)
 * @param commentPath Path to the comment as /$Comment_ID/$Comment_ID1/...
 * @returns {Promise<string>} Returns the id of the comment
 */
export async function addComment(postId, comment, user, commentPath) {
    if(!user) throw Error("Trying to add comment but no user found. Maybe user is not logged in?")
    if(!postId) throw Error(`Trying to create comment but postId is undefined`)
    if(!comment) throw Error("Comment is empty")

    //TODO Do all this in a transaction
    const postKey = await createNewComment(postId, comment,user, commentPath)
    await Promise.all([increaseCommentCounter(postId) ,voteComment(postId,`${commentPath?commentPath+'/':''}${postKey}`, user.uid)])
    return postKey
}

function editCommentKarma(postId, commentPath,up) {
    const increment = (up * 2) - 1
    const cPath = parseCommentPath(commentPath)
    const ref = firebase.database().ref(`comments/${postId}/${cPath}`)
    return ref.child('upvotes').set(firebase.database.ServerValue.increment(increment))
}

/**
 * Vote on a comment
 * @param postId Id of the post
 * @param commentPath Path of the comment as /$Comment_ID/$Comment_ID1/...
 * @param userId ID of the user doing the vote
 * @param upvote True to upvote, false to downvote/undo upvote
 * @returns {Promise<any[]>} Resulting promises for edit karma promise and user upvote promise
 */
export function voteComment(postId, commentPath, userId, upvote = true) {
    //TODO Would be nice to move all of these post/comment functions into
    //a class where the user checks and stuff is done through polymorphism
    // console.log(commentPath)
    // console.log(userId)
    if(!userId) throw Error("UserId not found. Maybe user is not logged in?")
    const commentId = commentPath.slice(commentPath.lastIndexOf('/') + 1)
    // console.log(`Path: ${commentPath}, ID: ${commentId}`)
    if(!commentId) throw Error("Comment ID not found")

    const ref = getUpvotedCommentsRef(userId)
    const updateObj = {}
    updateObj[commentId] = upvote
    //TODO Do this in transaction
    return Promise.all([editCommentKarma(postId, commentPath, upvote),ref.update(updateObj)])
}

export function getCommentsRef(postId) {
    return firebase.database().ref(`comments/${postId}`)
}

export function getUpvotedCommentsRef(userId) {
    return firebase.database().ref(`user_profile/${userId}/comment_upvotes`)
}
