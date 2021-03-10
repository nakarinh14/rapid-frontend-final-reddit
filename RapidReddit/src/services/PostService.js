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
    // if (!user) throw { code: 3, message: 'User not found' }
    const timestamp = new Date().getTime()
    const ref = firebase.database().ref(`posts`).push({title: postTitle, caption: description, subreadit: subreadit, user: 'username', created: timestamp})
    return ref.key
}

export function getRefForUserPosts(user) {
    return firebase.database().ref('posts').orderByChild("user").equalTo(user)
}

export function getRefForSubreaditPosts(subreadit) {
    return firebase.database().ref(`posts`).orderByChild("subreadit").equalTo(subreadit)
}
