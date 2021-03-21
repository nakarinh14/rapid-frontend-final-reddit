import React, {useEffect, useState} from 'react';
import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import {Block,Card,Text} from 'galio-framework';
import theme from "../theme";
import * as SubredditService from '../services/SubredditService'


function SubredditPreview({props}){

    const [subreddit, setSubreddit] = useState(props);

    // useEffect(() => {

    //     const subredditRef = SubredditService.getRefForSubreddit(subredditId)

    //     subredditRef.on('value', snapshot => {
    //         data = snapshot.val();
    //         setSubreddit(data)
    //         window.console.log("data: ")
    //         window.console.log(data)
    //     })

    //     return function cleanup() {
    //         ref.off('value')
    //     }


    //     },[])
    return (
        <Card
            style={styles.subredditPreview}
            title={subreddit.name}
            caption={subreddit.description}
            avatar="https://i.imgur.com/JcUJXxgl.png">
        </Card>
    )
}




const styles = StyleSheet.create({
    subredditPreview: {
        margin: 10,
        backgroundColor: 'white',
    }
})

export default SubredditPreview;
