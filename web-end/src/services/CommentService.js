import { firebase } from '../firebase'
import { calculateKarma } from '../utils/karma'

function getRequestsToFillTree (tree, root = true) {
  if (root) {
    return Object.keys(tree || {}).reduce((ac, v) => ac.concat(getRequestsToFillTree(tree[v], false)), [])
  }
  async function fillCommentData () {
    tree.comment = (await firebase.database().ref(`comments/${tree.id}`).get()).val()
  }
  if (tree.comments) {
    const forward = Object.keys(tree.comments).reduce((prev, c) => prev.concat(getRequestsToFillTree(tree.comments[c], false)), [])
    return [fillCommentData].concat(forward)
  } else return [fillCommentData]
}

function parseCommentPath (commentPath) {
  if (commentPath[0] === '/') commentPath = commentPath.slice(1)
  commentPath = commentPath.replace(/\//g, '/comments/')
  return commentPath || ''
}

async function increaseCommentCounter (postId) {
  const ref = firebase.database().ref(`posts/${postId}`)
  return await ref.child('comments_freq').set(firebase.database.ServerValue.increment(1))
}

function generateNewCommentObject (displayName, uid, commentBody, postId, postTitle, postSubreadit, timestamp) {
  return {
    timestamp,
    user: { displayName, uid },
    body: commentBody,
    upvotes: 0,
    post_id: postId,
    post_title: postTitle,
    post_subreadit: postSubreadit
  }
}
/**
 * Add a comment
 * @param postId ID of the post
 * @param comment The contents of the comment
 * @param user The user object (Must contain displayName and uid)
 * @param commentPath Path to the comment as /$Comment_ID/$Comment_ID1/...
 * @param postTitle
 * @param postSubreadit
 * @returns {Promise<string>} Returns the id of the comment
 */

async function createNewComment (postId, comment, user, commentPath, postTitle, postSubreadit) {
  const timestamp = new Date().getTime()

  if (commentPath) commentPath = `${parseCommentPath(commentPath)}/comments`
  console.log(`Creating new comment: ${commentPath}`, user)
  const commentObj = generateNewCommentObject(
    user.displayName, user.uid, comment, postId, postTitle, postSubreadit, timestamp
  )
  const path = `post_comments/${postId}/${commentPath || ''}`
  const newCommentRef = firebase.database().ref('comments').push(commentObj)
  const commentKey = newCommentRef.key

  await Promise.all([
    firebase.database().ref(`${path}/${commentKey}`).set({ id: commentKey }),
    firebase.database().ref(`user_profile/${user.displayName}/comments/${commentKey}`).set(true),
    increaseCommentCounter(postId)
  ])
  return commentKey
}

/**
 * Add a comment
 * @param postId ID of the post
 * @param comment The contents of the comment
 * @param user The user object (Must contain displayName and uid)
 * @param commentPath Path to the comment as /$Comment_ID/$Comment_ID1/...
 * @returns {Promise<string>} Returns the id of the comment
 */
export async function addComment (postId, comment, user, commentPath, postTitle, postSubreadit) {
  if (!user) throw Error('Trying to add comment but no user found. Maybe user is not logged in?')
  if (!postId) throw Error('Trying to create comment but postId is undefined')
  if (!comment) throw Error('Comment is empty')

  const commentId = await createNewComment(
    postId, comment, user, commentPath, postTitle, postSubreadit
  )
  await voteComment(commentId, user.displayName)

  return commentId
}

/**
 * Vote on a comment
 * @param commentId ID of the comment
 * @param username ID of the user doing the vote
 * @param upvote True to upvote, false to downvote/undo upvote
 * @returns {Promise<any[]>} Resulting promises for edit karma promise and user upvote promise
 */
export function voteComment (commentId, username, upvote = true) {
  // TODO Would be nice to move all of these post/comment functions into
  // a class where the user checks and stuff is done through polymorphism

  if (!username) throw Error('Username not found. Maybe user is not logged in?')
  if (!commentId) throw Error('Comment ID not found')
  return updateCommentKarmaTransaction(upvote, commentId, username)
}

function updateCommentKarmaTransaction (upvote, commentId, username) {
  let newKarma = 0
  let upvoteStatus = null
  return firebase.database().ref(`comments/${commentId}`).transaction((comment) => {
    if (comment != null) {
      // Sometimes transaction return null value, as it first use cached local value
      if (comment.user_upvotes == null) {
        comment.user_upvotes = {}
      }
      newKarma = calculateKarma(comment.user_upvotes[username], upvote)
      comment.upvotes = comment.upvotes == null ? newKarma : comment.upvotes + newKarma
      upvoteStatus = comment.user_upvotes[username] === upvote ? null : upvote
      comment.user_upvotes[username] = upvoteStatus

      return comment
    } else {
      // If comment === null, return a value that is totally different
      // from what is saved on the server at this address: to restart transaction
      return {}
    }
  }, (error, committed) => {
    if (error) {
      console.log('Update Comment Karma error in transaction')
    } else if (!committed) {
      console.log('Update Comment Karma Transaction not committed')
    } else {
      console.log('Update Comment Karma Transaction Committed')
      updateProfileCommentKarma(newKarma, upvoteStatus, commentId, username)
    }
  })
}

async function updateProfileCommentKarma (newKarma, upvoteStatus, commentId, username) {
  const snapshot = await firebase.database().ref(`comments/${commentId}/user/displayName`).once('value')
  const commentAuthor = snapshot.val()
  console.log(newKarma, upvoteStatus, commentId, username)
  await Promise.all([
    firebase.database().ref(`user_profile/${username}/comment_upvotes/${commentId}`).set(upvoteStatus),
    firebase.database().ref(`user_profile/${commentAuthor}/stats/comment_karma`).set(
      firebase.database.ServerValue.increment(newKarma)
    )
  ]).catch((err) => console.log(err))
}

// Created like this to mimic firebase on vs get functions in case we wanted to use them
export function getCommentsForPost (postId) {
  async function fillTree (tree) {
    const requests = getRequestsToFillTree(tree)
    await Promise.all(requests.map(v => v()))
    return tree
  }

  return {
    /**
     * Get comment tree and comments once.
     * @returns {Promise<*>} Promise that will return the full comment tree when complete
     */
    get: async function () {
      const tree = (await firebase.database().ref(`post_comments/${postId}`).get()).val()
      return await fillTree(tree)
    },
    /**
     * Get comment tree and comments and add a listener (Will currently not update upvotes in real time)
     * @param value Firebase event to listen to
     * @param listener Listener to recieve data
     */
    on: function (value, listener) {
      // Listener for comment tree updates (New comments etc)
      firebase.database().ref(`post_comments/${postId}`).on(value, async function (res) {
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
    off: function (value, listener = null) {
      firebase.database().ref(`post_comments/${postId}`).off(value, listener)
    }
  }
}

export function getCommentsForUser (username) {
  return {
    get: async function () {
      try {
        const map = {}
        const ids = (await firebase.database().ref(`user_profile/${username}/comments`).get()).val() || {}
        const requests = Object.keys(ids).map(v => async () => {
          map[v] = (await firebase.database().ref(`comments/${v}`).get()).val()
        })
        await Promise.all(requests.map(v => v()))
        return map
      } catch (err) {
        console.log(err)
      }
    }
  }
}
