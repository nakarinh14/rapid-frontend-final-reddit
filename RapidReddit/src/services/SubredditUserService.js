import {firebase} from '../firebase'


export function addSubredditUserRole(subredditId, user, role){
    firebase.database().ref('subreddit_roles/' + subredditId).get().then(function(snapshot) {
        if (snapshot.exists()) {
            var subreddit = snapshot.val()
            window.console.log("SUBERDDIT:")
            window.console.log(subreddit)
            var roles = subreddit["special_roles"]
            roles[user] = role

            firebase.database().ref('subreddit_roles/' + subredditId).push(roles)
            
          console.log(snapshot.val());
        }
        else {
            var obj = {}
            obj[user] = role
            firebase.database().ref('subreddit_roles/' + subredditId).update(obj)
        }
      }).catch(function(error) {
        console.error(error);
      });

}