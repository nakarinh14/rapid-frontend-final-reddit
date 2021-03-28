import {firebase} from '../firebase'

function generatePostObject(uid, displayName, title, caption, subreadit) {
    const created = new Date().getTime()
    return {
        title,
        caption,
        subreadit,
        user: {displayName, uid},
        created,
        comments_freq: 0,
        karma: 1,
    }
}

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

    const postObj = generatePostObject(user.uid, user.displayName, postTitle, description, subreadit)
    const ref = firebase.database().ref(`posts`).push(postObj)
    return ref.key
}

export function getRefForPosts() {
    return firebase.database().ref(`posts`)
}

export function getPostById(id) {
    return firebase.database().ref('posts').child(id)
}

export function getRefForUserPosts(userId) {
    return firebase.database().ref('posts').orderByChild("user/uid").equalTo(userId)
}

export function getRefForSubreaditPosts(subreadit) {
    return firebase.database().ref('posts').orderByChild("subreadit").equalTo(subreadit)
}

