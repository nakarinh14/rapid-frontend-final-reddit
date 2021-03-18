import {firebase} from '../firebase'

/**
 * Add new post to firebase
 * @param subreadit subreadit that new post will belong to
 * @param user User trying to create the new post
 * @param postTitle Title of the new post
 * @param description Description or text content of the new post
 * @returns {string} The key of the new post
 * @throws Error if subreadit, title, or user fields are empty
 */
export function addNewPost(subreadit, user, postTitle, description) {
    if (!subreadit) throw { code: 1, message: 'Subreadit cannot be empty' }
    if (!postTitle) throw { code: 2, message: 'Post title cannot be empty' }
    if (!user) throw { code: 3, message: 'User not found' }
    const timestamp = new Date().getTime()
    const postObj = {
        title: postTitle,
        caption: description,
        subreadit: subreadit,
        user: user,
        created: timestamp,
        comments_freq: 0,
        karma: 1,
    }
    const ref = firebase.database().ref(`posts`).push(postObj)
    //TODO Add post to user upvoted posts
    return ref.key
}

export async function increaseCommentCounter(postId) {
    const ref = firebase.database().ref(`posts/${postId}`)
    const postInfo = await ref.get()
    return await ref.update({comments_freq: postInfo.val().comments_freq + 1})
}

export function getRefForUserPosts(user) {
    return firebase.database().ref('posts').orderByChild("user").equalTo(user)
}

export function getRefForSubreaditPosts(subreadit) {
    return firebase.database().ref(`posts`).orderByChild("subreadit").equalTo(subreadit)
}

export function getRefForPosts() {
    return firebase.database().ref(`posts`)
}

export function getPostById(id) {
    return firebase.database().ref('posts').child(id)
}

export async function getAuthorsForPosts(posts) {
    const ids = posts.map(v => v.id)
}
