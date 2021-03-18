import React, {useEffect, useState} from 'react'
import {Block, Text} from "galio-framework";
import {ActivityIndicator, StyleSheet} from "react-native";
import {PostPreview} from "./PostPreview";
import * as PostService from '../services/PostService'
import {Divider} from "react-native-elements";

function RenderPosts({posts, loadingPosts}) {
    if(loadingPosts) {
        return (
            <Block flex center style={styles.container}>
                <ActivityIndicator size={"large"}/>
            </Block>
        )
    }
    else if(posts.length === 0) {
        return (
            <Block flex center style={styles.container}>
                <Text>It looks like there are no posts here :(</Text>
            </Block>
        )
    }
    return (
        <Block flex column style={styles.container}>
            {posts.map((val, idx) =>
                <>
                    <Block style={{marginBottom: 5}} key={idx}>
                    <PostPreview touchable post={val}/>
                    </Block>
                    <Divider style={{ backgroundColor: 'lightgrey' }} />
                </>
            )}
        </Block>
    )
}

export default function({subreadit, user}) {

    let ref = PostService.getRefForPosts()
    if(subreadit) {
        ref = PostService.getRefForSubreaditPosts(subreadit)
    }
    else if(user) {
        ref = PostService.getRefForUserPosts(user)
    }

    const [ posts, setPosts ] = useState([])
    const [ loadingState, setLoadingState ] = useState(true)

    useEffect(() => {
        ref.on('value', snapshot => {
            const data = snapshot.val() || []
            Object.keys(data).map(v => {
                data[v].id = v
            })
            setPosts(Object.values(data))
            setLoadingState(false)
        })
        return () => {
            ref.off('value')
        }
    }, [])

    return (
        <RenderPosts posts={posts} loadingPosts={loadingState}/>
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'lightgrey'
    }
})
