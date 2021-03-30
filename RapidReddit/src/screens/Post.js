import React, {useEffect, useState} from 'react';
import {Block, Icon, Text} from "galio-framework";
import {PostPreview} from "../components/PostPreview";
import CommentSection from "../components/CommentSection"
import {Platform, RefreshControl, ScrollView, TouchableOpacity} from "react-native";
import { NavBar } from 'galio-framework';
import theme from "../theme";
import { getPostById } from "../services/PostService";
import { getCommentsForPost } from '../services/CommentsService'
import PostCommentsContext from "../contexts/PostCommentsContext";

const Post = ({route, navigation}) => {

    const { postId } = route.params
    const [refreshing, setRefreshing] = useState(false)
    const [ comments, setComments ] = useState({})
    const [ post, setPost ] = useState({id: postId, user: {}})

    const fetchComments = async () => {
        const res = await getCommentsForPost(postId).get()
        setComments(res)
    }

    const fetchPost = async (postId) => {
        if(postId) {
            const result = await getPostById(postId).get()
            const fetchedPost = result.val()
            fetchedPost.id = postId
            setPost(fetchedPost)
        }
    }

    const refreshPost = () => fetchComments()

    const onRefresh =  async () => {
        setRefreshing(true)
        try {
            await refreshPost()
        } catch (err) {
            console.log(err)
        }
        setRefreshing(false)
    }

    useEffect(() => {
        refreshPost()
        getPostById(postId).on('value',(snapshot) => {
            const p = snapshot.val()
            p.id = postId
            setPost(p)
        })
        return () => {
            getCommentsForPost(postId).off('value')
            getPostById(postId).off('value')
        }
    }, [])

    const postUpdateContext = {
        refreshPost,
        postId,
        post
    }

    if(!postId) return (
        <Block flex center>
            <Text>Error. No id found</Text>
        </Block>
    )
    return (
        <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
            <NavBar
                titleStyle={{fontSize: 19, fontWeight: 'bold'}}
                title={`${post.comments_freq || 0} Comments`}
                left={(
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon
                            name="arrow-left"
                            family="feather"
                            size={28}
                            color={theme.COLORS.ICON}
                        />
                    </TouchableOpacity>
                )}
                style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null}
            />
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <Block>
                    <PostCommentsContext.Provider value={postUpdateContext}>
                        <PostPreview post={post}/>
                        <CommentSection comments={comments} postId={post.id}/>
                    </PostCommentsContext.Provider>
                </Block>
            </ScrollView>
        </Block>
    )
}

export default Post;
