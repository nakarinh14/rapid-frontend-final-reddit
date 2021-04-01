import React, {useEffect, useState} from 'react'
import {Block, Text} from "galio-framework";
import { StyleSheet, View} from "react-native";
import {Fade, Placeholder, PlaceholderLine, PlaceholderMedia} from "rn-placeholder";
import {PostPreview} from "./PostPreview";
import * as PostService from '../services/PostService'
import {Divider} from "react-native-elements";
import theme from "../theme";

function RenderPosts({posts, loadingPosts}) {
    if (loadingPosts) {
        return (
            <Block flex center style={styles.container}>
                <View style={{paddingHorizontal: 30, marginTop: 20}}>
                    {
                        [1,1,1,1,1].map((key, idx) => (
                            <Placeholder
                                key={idx}
                                Animation={Fade}
                                Left={PlaceholderMedia}
                                style={{marginBottom: 20}}
                            >
                                <PlaceholderLine />
                                <PlaceholderLine width={80} />
                                <PlaceholderLine width={30} />
                            </Placeholder>
                        ))
                    }
                </View>
            </Block>
        )
    } else if (posts.length === 0) {
        return (
            <Block flex center style={styles.container}>
                <Block style={{marginTop: 20}}>
                    <Text style={{color: theme.COLORS.GREY}}>
                        Ops. Looks like there are no posts here. {String.fromCodePoint('0x1F614')}
                    </Text>
                </Block>
            </Block>
        )
    }
    return (
        <Block flex column style={styles.container}>
            {posts.map((val, idx) =>
                <View key={idx}>
                    <Block style={{marginBottom: 5}}>
                        <PostPreview touchable post={val}/>
                    </Block>
                    <Divider style={{backgroundColor: 'lightgrey'}}/>
                </View>
            )}
        </Block>
    )
}

const attachRef = async (ref, filter, setter, callback) => {
    ref.on('value', (snapshot) => {
        let data = snapshot.val() || []
        data = Object.keys(data)
            .filter(filter(data))
            .sort((a,b) => {
                if(data[a].created > data[b].created) return -1
                else if(data[a].created < data[b].created) return 1
                return 0
            })
            .reduce((obj, key) => {
                obj[key] = data[key];
                obj[key].id = key
                return obj;
            }, {});
        setter(Object.values(data))
        callback()
    })
}

export default function ({subreadit, username, refresh, setter}) {
    const [posts, setPosts] = useState([])
    const [loadingState, setLoadingState] = useState(true)

    useEffect(() => {
        const ref = PostService.getRefForPosts()
        // Temporary solution to filter
        let filter = data => key => true
        if (subreadit) {
            filter = data => key => data[key].subreadit === subreadit
        } else if (username) {
            filter = data => key => data[key].user.displayName === username
        }
        attachRef(ref, filter, setPosts, () => {
            setLoadingState(false)
            if(setter != null){
                setter()
            }
        })
        return () => {
            ref.off('value')
        }
    }, [subreadit, username, refresh])

    return (
        <RenderPosts posts={posts} loadingPosts={loadingState}/>
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'lightgrey'
    }
})
