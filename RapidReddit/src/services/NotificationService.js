import {firebase} from "../firebase";
import objects from "react-native-web/dist/exports/StyleSheet/ReactNativePropRegistry";

export function getNotificationRef(recipient) {
    return firebase.database().ref(`notifications/${recipient}`)
}

async function increaseNotificationCounter(recipient) {
    const ref = getNotificationRef(recipient)
    return await ref.child('counter').set(firebase.database.ServerValue.increment(1))
}

export async function addNotification(recipient, notifyObj) {
    // Prevent same notification to own action
    if(recipient && recipient !== notifyObj.name) {
        return Promise.all([
            getNotificationRef(recipient).child('objects').push(notifyObj),
            increaseNotificationCounter(recipient)
        ])
    }
}

export async function removeNotification(recipient, notificationId) {
    return await getNotificationRef(recipient).child(`objects/${notificationId}`).set(null)
}

export async function readNotification(recipient, notificationId) {
    return await getNotificationRef(recipient).child(`objects/${notificationId}/read`).set(true)
}

export async function clearNotificationCounter(recipient) {
    return await getNotificationRef(recipient).child('counter').set(0)
}
