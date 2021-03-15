import {firebase} from '../firebase'


export function addSubredditUserRole(subredditId, user, role){
    database.child("subreddits").child(subredditId).get().then(function(snapshot) {
        if (snapshot.exists()) {
            var subreddit = snapshot.val()
            var roles = subreddit["special_role"]
            roles[user] = role
            
          console.log(snapshot.val());
        }
        else {
          console.log("No data available");
        }
      }).catch(function(error) {
        console.error(error);
      });

}