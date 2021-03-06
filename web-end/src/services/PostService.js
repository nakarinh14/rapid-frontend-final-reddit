import { firebase } from '../firebase'
import { calculateKarma } from '../utils/karma'

function generatePostObject (uid, displayName, title, caption, subreadit) {
  const created = new Date().getTime()
  return {
    title,
    caption,
    subreadit,
    user: { displayName, uid },
    created,
    comments_freq: 0,
    karma: 1
  }
}

export function getRefForPosts () {
  return firebase.database().ref('posts')
}

export function getPostById (id) {
  return firebase.database().ref('posts').child(id)
}

async function updateProfilePostKarma (newKarma, upvoteStatus, postId, username) {
  const author = (await firebase.database().ref(`posts/${postId}/user/displayName`).once('value')).val()
  console.log()
  await Promise.all([
    firebase.database().ref(`user_profile/${username}/post_upvotes/${postId}`).set(upvoteStatus),
    firebase.database().ref(`user_profile/${author}/stats/post_karma`).set(
      firebase.database.ServerValue.increment(newKarma)
    )
  ]).catch(err => console.log(err))
}

export function addNewPost (subreadit, user, postTitle, description) {
  const postObj = generatePostObject(user.uid, user.displayName, postTitle, description, subreadit)
  const ref = firebase.database().ref('posts').push(postObj)
  return ref.key
}

export function votePost (postId, username, upvote = true) {
  console.log(`Voting on post: ${postId}, username: ${username}`)
  const ref = firebase.database().ref(`posts/${postId}`)
  let newKarma = 0
  let upvoteStatus = null
  return ref.transaction((post) => {
    if (post) {
      if (!post.user_upvotes) post.user_upvotes = {}

      newKarma = calculateKarma(post.user_upvotes[username], upvote)
      post.karma = post.karma == null ? newKarma : post.karma + newKarma
      upvoteStatus = post.user_upvotes[username] === upvote ? null : upvote
      post.user_upvotes[username] = upvoteStatus
      return post
    } else {
      return {}
    }
  }, (error, committed) => {
    if (error) {
      console.log('Update post karma error in transaction')
    } else if (!committed) {
      console.log('Update post karma transaction not committed')
    } else {
      console.log('Update post karma transaction committed')
      updateProfilePostKarma(newKarma, upvoteStatus, postId, username)
    }
  })
}
