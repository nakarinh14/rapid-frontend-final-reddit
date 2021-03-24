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
    if(commentPath) commentPath = `${parseCommentPath(commentPath)}/comments`
    const commentItem = {
        timestamp: new Date().getTime(),
        user: {
            displayName: user.displayName,
            uid: user.uid
        },
        body: comment,
        upvotes: 0,
        post_id: postId
    }
    // console.log(commentItem)
    const path = `post_comments/${postId}/${commentPath || ''}`
    const newPostRef = firebase.database().ref(`comments`).push(commentItem)
    const postKey = newPostRef.key
    await Promise.all([firebase.database().ref(`${path}/${postKey}`).set({id: postKey}),increaseCommentCounter(postId)])
    // Use set to atomically update multiple data path
    //TODO Would be nice if can include subreddit and post title. To display in user profile
    return postKey
}

function addCommentToUser(commentId, userId){
    const ref = firebase.database().ref(`user_profile/${userId}/comments`)
    const obj = {}
    obj[commentId] = true
    return ref.update(obj)
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
    const commentId = await createNewComment(postId, comment,user, commentPath)
    await Promise.all([
        voteComment(commentId, user.uid),
        addCommentToUser(commentId,user.uid)
    ])
    return commentId
}

function editCommentKarma(commentId,up) {
    const increment = (up * 2) - 1
    const ref = firebase.database().ref(`comments/${commentId}`)
    return ref.child('upvotes').set(firebase.database.ServerValue.increment(increment))
}

/**
 * Vote on a comment
 * @param commentId ID of the comment
 * @param userId ID of the user doing the vote
 * @param upvote True to upvote, false to downvote/undo upvote
 * @returns {Promise<any[]>} Resulting promises for edit karma promise and user upvote promise
 */
export function voteComment(commentId, userId, upvote = true) {
    //TODO Would be nice to move all of these post/comment functions into
    //a class where the user checks and stuff is done through polymorphism
    if(!userId) throw Error("UserId not found. Maybe user is not logged in?")
    if(!commentId) throw Error("Comment ID not found")

    const ref = getUpvotedCommentsRef(userId)
    const updateObj = {}
    updateObj[commentId] = upvote
    //TODO Do this in transaction
    return Promise.all([editCommentKarma(commentId, upvote),ref.update(updateObj)])
}

export function getCommentsRef(postId) {
    return firebase.database().ref(`comments/${postId}`)
}

export function getUpvotedCommentsRef(userId) {
    return firebase.database().ref(`user_profile/${userId}/comment_upvotes`)
}

export function getUserCommentsRef(userId) {
    return firebase.database().ref(`user_profile/${userId}/comments`)
}

function getRequestsToFillTree (tree, root=true) {
    if(root){
        return Object.keys(tree).reduce((ac,v) => ac.concat(getRequestsToFillTree(tree[v],false)),[])
    }
    async function fillCommentData() {
        tree.comment=(await firebase.database().ref(`comments/${tree.id}`).get()).val()
    }
    if(tree.comments){
        const forward = Object.keys(tree.comments).reduce((prev,c) => prev.concat(getRequestsToFillTree(tree.comments[c],false)),[])
        return [fillCommentData].concat(forward)
    }
    else return [fillCommentData]
}

// This is single update version
export async function getCommentsForPost(postId) {
    const tree = (await firebase.database().ref(`post_comments/${postId}`).get()).val()
    const requests = getRequestsToFillTree(tree)
    await Promise.all(requests.map(v => v()))
    console.log(tree)
    return tree
}

export async function getRealtimeCommentsForPost(listenerFunction) {

}
