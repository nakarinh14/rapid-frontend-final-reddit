import {firebase} from "../../../RapidReddit/src/firebase";

export function getRefForPosts() {
  return firebase.database().ref(`posts`)
}

export function getPostById(id) {
  return firebase.database().ref('posts').child(id)
}
