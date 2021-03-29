import { firebase } from '../firebase'

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
