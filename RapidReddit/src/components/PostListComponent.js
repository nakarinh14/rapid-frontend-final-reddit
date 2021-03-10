import React, {useEffect, useState} from 'react'
import {Block, Text} from "galio-framework";
import {ActivityIndicator, StyleSheet} from "react-native";
import {PostPreview} from "./PostPreview";
import * as PostService from '../services/PostService'

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
    else{
        return (
            <Block flex column style={styles.container}>
                {posts.map((val, idx) =>
                    <Block style={{marginBottom: 5}} key={idx}>
                        <PostPreview touchable post={val}/>
                    </Block>
                )}
            </Block>
        )
    }
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
            setPosts(Object.values(snapshot.val() || []))
            setLoadingState(false)
        })
        return function cleanup() {
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
