import {firebase} from '../firebase'

export function getRefForSubredditRoles(subredditId) {
    return firebase.database().ref('subreddit_roles/' + subredditId)
}

export function updateSubredditUserRole(subredditId, user, role) {
    return firebase.database().ref('subreddit_roles/' + subredditId).get().then(function (snapshot) {
        if (snapshot.exists()) {
            const roles = snapshot.val()
            roles[user] = role

            firebase.database().ref('subreddit_roles/' + subredditId).update(roles)

        } else {
            const obj = {}
            obj[user] = role
            firebase.database().ref('subreddit_roles/' + subredditId).update(obj)
        }
    }).catch(function (error) {
        console.error(error);
    });

}
