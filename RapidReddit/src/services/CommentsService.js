import {firebase} from '../firebase'

function parseCommentPath(commentPath) {
    if(commentPath[0] === '/') commentPath = commentPath.slice(1)
    commentPath = commentPath.replace(/\//g,'/comments/')
    return commentPath || ''
}

async function increaseCommentCounter(postId) {
    const ref = firebase.database().ref(`posts/${postId}`)
    return await ref.child('comments_freq').set(firebase.database.ServerValue.increment(1))
}

function generateNewCommentObject(displayName, uid, commentBody, postId) {
    const timestamp = new Date().getTime()
    return {
        timestamp,
        user: {displayName, uid},
        body: commentBody,
        upvotes: 0,
        post_id: postId
    }
}

/**
 * Add a comment
 * @param postId ID of the post
 * @param comment The contents of the comment
 * @param user The user object (Must contain displayName and uid)
 * @param commentPath Path to the comment as /$Comment_ID/$Comment_ID1/...
 * @returns {Promise<string>} Returns the id of the comment
 */

async function createNewComment(postId, comment, user, commentPath) {
    if(commentPath) commentPath = `${parseCommentPath(commentPath)}/comments`
    const commentObj = generateNewCommentObject(user.displayName, user.uid, comment, postId)

    const path = `post_comments/${postId}/${commentPath || ''}`
    const newPostRef = firebase.database().ref(`comments`).push(commentObj)
    const postKey = newPostRef.key
    //TODO Would be nice if can include subreddit and post title. To display in user profile
    await Promise.all([
        firebase.database().ref(`${path}/${postKey}`).set({id: postKey}),
        increaseCommentCounter(postId)
    ])
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
    const commentId = await createNewComment(postId, comment,user, commentPath)

    await firebase.database().ref().transaction((db) => {
        voteCommentTransactionHelper(db, true, commentId, user.displayName)
        db['user_profile'][user.displayName].comments = true
        return db
    })

    return commentId
}

/**
 * Vote on a comment
 * @param commentId ID of the comment
 * @param username ID of the user doing the vote
 * @param upvote True to upvote, false to downvote/undo upvote
 * @returns {Promise<any[]>} Resulting promises for edit karma promise and user upvote promise
 */
export function voteComment(commentId, username, upvote) {
    //TODO Would be nice to move all of these post/comment functions into
    //a class where the user checks and stuff is done through polymorphism

    if(!username) throw Error("Username not found. Maybe user is not logged in?")
    if(!commentId) throw Error("Comment ID not found")

    firebase.database().ref().transaction((db) => {
        voteCommentTransactionHelper(db, upvote, commentId, username)
        return db
    })
}

function voteCommentTransactionHelper(db, upvote, commentId, username) {

    const userPath = db['user_profile'][username]
    if(userPath['comment_upvotes'] == null){
        userPath['comment_upvotes'] = {}
    }
    const isVoted = userPath['comment_upvotes'][commentId]
    const commentAuthor = db.comments[commentId].user.displayName
    const upvoteWeight = upvote ? 1 : -1
    let newKarmaWeight = upvoteWeight

    // For isVoted -> null: not yet voted, true: already upvoted, false: already downvoted
    if(isVoted === upvote) {
        // If user action apply to already applied karma status, nullified its karma
        // (e.g. Pressing upvote/downvote when comment is already upvoted/downvoted respectively)
        newKarmaWeight *= -1
        userPath['comment_upvotes'][commentId]  = null
    } else {
        const currentKarmaWeight = isVoted == null ? 0 : -(isVoted * 2 - 1)
        newKarmaWeight = upvoteWeight + currentKarmaWeight
        userPath['comment_upvotes'][commentId]  = upvote
    }
    // Update new karma to relevant data
    const commentPath = db.comments[commentId]
    commentPath.upvotes = commentPath.upvotes == null ? newKarmaWeight  : commentPath.upvotes + newKarmaWeight
    const authorProfile = db['user_profile'][commentAuthor]
    if(authorProfile.stats == null) {
        authorProfile.stats = {}
    }
    authorProfile.stats['comment_karma'] = authorProfile.stats['comment_karma'] == null ?
        newKarmaWeight : authorProfile.stats['comment_karma'] + newKarmaWeight
}

export function getCommentsRef(postId) {
    return firebase.database().ref(`comments/${postId}`)
}

export function getUpvotedCommentsRef(username) {
    return firebase.database().ref(`user_profile/${username}/comment_upvotes`)
}

export function getUserCommentsRef(userId) {
    return firebase.database().ref(`user_profile/${userId}/comments`)
}

function getRequestsToFillTree (tree, root=true) {
    if(root){
        return Object.keys(tree ? tree : {}).reduce((ac,v) => ac.concat(getRequestsToFillTree(tree[v],false)),[])
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

//Created like this to mimic firebase on vs get functions in case we wanted to use them
export function getCommentsForPost(postId) {

    async function fillTree(tree) {
        const requests = getRequestsToFillTree(tree)
        await Promise.all(requests.map(v => v()))
        return tree
    }

    return {
        /**
         * Get comment tree and comments once.
         * @returns {Promise<*>} Promise that will return the full comment tree when complete
         */
        get: async function() {
            const tree = (await firebase.database().ref(`post_comments/${postId}`).get()).val()
            return await fillTree(tree)
        },
        /**
         * Get comment tree and comments and add a listener (Will currently not update upvotes in real time)
         * @param value Firebase event to listen to
         * @param listener Listener to recieve data
         */
        on: function (value, listener) {
            //Listener for comment tree updates (New comments etc)
            firebase.database().ref(`post_comments/${postId}`).on(value,async function(res) {
                const tree = res.val()
                const result = await fillTree(tree)
                listener(result)
            })
        },
        /**
         * Remove listeners
         * @param value Firebase event to listen to
         * @param listener (Optional) Listener to remove
         */
        off: function(value, listener = null) {
            firebase.database().ref(`post_comments/${postId}`).off(value,listener)
        }
    }
}

/**
 * Non real-time fetch comments for user
 * @param userId the user id
 * @returns {{get: (function(): unknown[]), off: off, on: on}}
 */
export function getCommentsForUser(userId) {
    return {
        get: async function() {
            const map = {}
            const ids = (await firebase.database().ref(`user_profile/${userId}/comments`).get()).val()
            const requests = Object.keys(ids).map(v => async () => {
                map[v] = (await firebase.database().ref(`comments/${v}`).get()).val()
            })
            await Promise.all(requests.map(v => v()))
            return map
        },
        // on: function(value,listener) {
        //
        // },
        // off: function(value, listener = null) {
        //
        // }
    }
}
