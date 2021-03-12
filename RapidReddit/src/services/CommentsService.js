import {firebase} from '../firebase'

export function addComment(post, comment, user, commentPath) {
    const commentItem = {
        timestamp: new Date().getTime(),
        user: user,
        body: comment
    }
    const ref = firebase.database().ref(`comments/${post.id}/${commentPath || ''}`).push(commentItem)
    return ref.key
}
