import React, {useEffect, useState} from 'react';
import {Block, Icon, Text} from "galio-framework";
import {PostPreview} from "../components/PostPreview";
import CommentSection from "../components/CommentSection"
import {Platform, ScrollView, TouchableOpacity } from "react-native";
import { NavBar } from 'galio-framework';
import theme from "../theme";
import {ReplyPostModal} from "../components/ReplyPostModal";
import { getPostById } from "../services/PostService";


const comments = {
    "1": {
        user: "a",
        timestamp: "2h",
        body: "[PURCHASE guide] 2020, ASK ANYTHING!",
        upvotes: 50,
        comments: {
            "1": {
                user: "a",
                timestamp: "2h",
                body: "[PURCHASE guide] 2020, ASK ANYTHING!",
                upvotes: 50

            }
        }
    },
    "2": {
        user: "a",
        timestamp: "2h",
        body: "[PURCHASE guide] 2020, ASK ANYTHING!",
        upvotes: 50,
        comments: {
            "1": {
                user: "a",
                timestamp: "2h",
                body: "[PURCHASE guide] 2020, ASK ANYTHING!",
                upvotes: 50
            },
            "2":{
                user: "YeetMeToTheMoon",
                timestamp: "10m",
                body: "Na u gonna yeet me",
                upvotes: 1012,
                comments:{
                    "1": {
                        user: "a",
                        timestamp: "5m",
                        body: "nope I won't",
                        upvotes: 50,
                        comments: {
                            "1":{
                                user: "YeetMeToTheMoon",
                                timestamp: "1m",
                                body: "yes u do",
                                upvotes: 1012,
                            }
                        }
                    },
                }
            }
        },
    },
    "3": {
        user: "a",
        timestamp: "5d",
        body: "[PURCHASE guide] 2020, ASK ANYTHING!",
        upvotes: 50,
        comments: {
            "1": {
                user: "a",
                timestamp: "1mo",
                body: "[PURCHASE guide] 2020, ASK ANYTHING!",
                upvotes: 50
            }
        },
    },
    "4": {
        user: "a",
        timestamp: "23h",
        body: "[PURCHASE guide] 2020, ASK ANYTHING!",
        upvotes: 50,
        comments: {
            "1": {
                user: "a",
                timestamp: "2h",
                body: "[PURCHASE guide] 2020, ASK ANYTHING!",
                upvotes: 50
            }
        },
    }
};

function RenderPost ({navigation, post}) {

    if(post) {
        return(
            <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
                <NavBar
                    titleStyle={{fontSize: 19, fontWeight: 'bold'}}
                    title={`${post.comments_freq || 0} Comments`}
                    left={(
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon
                                name="arrow-left"
                                family="feather"
                                size={24}
                                color={theme.COLORS.ICON}
                            />
                        </TouchableOpacity>
                    )}
                    style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null}
                />
                <ScrollView>
                    <Block>
                        <PostPreview
                            post={post}
                        />
                        <CommentSection comments={comments}/>
                    </Block>
                </ScrollView>
            </Block>
        )
    }
    else {
        return(
            <Block flex center>
                <Text>Post not found</Text>
            </Block>
        )
    }
}

const Post = ({route, navigation}) => {

    const [ post, setPost ] = useState(null)

    const {postId} = route.params

    useEffect(() => {
        if(postId) {
            getPostById(postId).get().then(result => {
                setPost(result.val())
            })
        }

    }, [])
    if(!postId) return (
        <Block flex center>
            <Text>Error. No id found</Text>
        </Block>
    )
    else return (
        <RenderPost post={post} navigation={navigation}/>
    )
}

export default Post;
