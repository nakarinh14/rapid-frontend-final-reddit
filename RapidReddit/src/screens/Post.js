import React, {useEffect, useState} from 'react';
import {Block, Icon, Text} from "galio-framework";
import {PostPreview} from "../components/PostPreview";
import CommentSection from "../components/CommentSection"
import {Platform, ScrollView, TouchableOpacity } from "react-native";
import { NavBar } from 'galio-framework';
import theme from "../theme";
import { getPostById } from "../services/PostService";
import { getCommentsRef } from '../services/CommentsService'


function RenderPost ({navigation, comments, post}) {

    if(!post) {
        return(
            <Block flex center>
                <Text>Post not found</Text>
            </Block>
        )
    }

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
                    <PostPreview post={post}/>
                    <CommentSection comments={comments} postId={post.id}/>
                </Block>
            </ScrollView>
        </Block>
    )
}

const Post = ({route, navigation}) => {

    const [ comments, setComments ] = useState({})
    const {postId} = route.params
    const [ post, setPost ] = useState({id: postId})

    useEffect(() => {
        if(postId) {
            getPostById(postId).get().then(result => {
                const p = result.val()
                p.id = postId
                setPost(p)
            })
            getCommentsRef(postId).on('value', (result) => {
                // console.log(result)
                setComments(result.val())
            })
        }

    }, [])
    if(!postId) return (
        <Block flex center>
            <Text>Error. No id found</Text>
        </Block>
    )
    return (
        <RenderPost post={post} comments={comments} navigation={navigation}/>
    )
}

export default Post;
