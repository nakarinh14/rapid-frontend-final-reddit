import {firebase} from "../firebase";
import 'firebase/auth'

export async function registerNewUser(email, password, displayName) {

    const ref = firebase.database().ref(`/user_profile/${displayName}`)
    const userProfile = await ref.get()

    if(userProfile.exists()){
        throw("User already exist")
    }

    const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)

    await user.user.updateProfile({
        displayName: displayName
    })

    await ref.set({
        stats: {
            post_karma: 0,
            comment_karma: 0,
            date_created: new Date().getTime()
        }
    })

}
