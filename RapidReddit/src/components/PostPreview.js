import React, {useContext, useState} from 'react';
import { TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import {Block, Text} from 'galio-framework';
import theme from '../theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";
import AuthenticationContext from "../contexts/AuthenticationContext";
import CommentReplyModal from "./CommentReplyModal";
import { getDisplayDate } from "../utils/post-date";
import { votePost } from "../services/PostService";
import * as Haptics from 'expo-haptics';

export const PostPreview = ({touchable, post}) => {

    const navigation = useNavigation()
    const [ replyModal, setReplyModal ] = useState(false)
    const { user } = useContext(AuthenticationContext)

    const onPressComment = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        if(!user){
            return navigation.push("Login")
        }
        setReplyModal(true)
    }

    function upvoteColor() {
        if(post.user_upvotes) {
            if(post.user_upvotes[user.displayName]) return 'tomato'
        }
        return theme.COLORS.MUTED
    }
    function downvoteColour() {
        if(post.user_upvotes) {
            if(post.user_upvotes[user.displayName] === false) return 'blue'
        }
        return theme.COLORS.MUTED
    }

    const onPressPost = () => {
        navigation.push("Post", {postId: post.id})
    }

    return (
        <Block style={styles.card}>
            <TouchableOpacity onPress={() => onPressPost()} disabled={!touchable}>
                <Block row style={styles.cardContent}>
                    <Block flex={1}>
                        <Block row>
                            <Block flex={3}>
                                <Block style={styles.title}>
                                    <Text style={styles.titleText}>
                                        {post.title}
                                    </Text>
                                </Block>
                                <Block style={styles.content}>
                                    <Text style={styles.contentText}>
                                        {post.caption}
                                    </Text>
                                </Block>
                            </Block>
                        </Block>
                    </Block>
                    <Block style={{marginVertical: 10}} row>
                        <Block style={{marginRight: 5}} center row>
                            <Pressable
                                onPress={() => navigation.push('Subreddit', {subreaditName: post.subreadit})}
                                hitSlop={5}
                            >
                                <Text style={styles.groupText} size={14} color={theme.COLORS.BLOCK}>
                                    {post.subreadit}
                                </Text>
                            </Pressable>
                            <Text color={theme.COLORS.MUTED}> by </Text>
                            <Pressable
                                onPress={() =>
                                    navigation.push("User", {username: post.user.displayName, owner: false})
                                }
                                hitSlop={5}
                            >
                                <Text style={styles.groupText} size={14} color={theme.COLORS.BLOCK}>
                                    {post.user?post.user.displayName:''}
                                </Text>
                            </Pressable>
                        </Block>
                        <Block center row style={{marginLeft: 2}}>
                            <Ionicons name="ios-time-outline" size={15} color={theme.COLORS.BLOCK} />
                            <Text size={14} color={theme.COLORS.BLOCK} style={{marginLeft: 1}}>
                                {getDisplayDate(post.created)}
                            </Text>
                        </Block>
                    </Block>
                    <Block row style={styles.bottomActions}>
                        <Block center row>
                            <Pressable hitSlop={3} onPress={() => votePost(post.id,user.displayName,true)}>
                                <MaterialCommunityIcons
                                    size={24}
                                    name="arrow-up-bold-outline"
                                    color={upvoteColor()}
                                />
                            </Pressable>
                            <Block>
                                <Text
                                    size={15}
                                    color={theme.COLORS.BLOCK}
                                    style={{marginLeft: 3, marginRight: 3, fontWeight: '500'}}
                                >
                                    {post.karma}
                                </Text>
                            </Block>
                            <Pressable hitSlop={3} onPress={() => votePost(post.id,user.displayName,false)}>
                                <MaterialCommunityIcons
                                    size={24}
                                    name="arrow-down-bold-outline"
                                    color={downvoteColour()}
                                />
                            </Pressable>
                        </Block>
                        <Pressable
                            style={{flexDirection:"row", alignItems:"center"}}
                            onPress={() => onPressComment()}
                            hitSlop={15}
                        >
                            <Block style={{marginRight: 5}} center>
                                <MaterialCommunityIcons
                                    name="comment-outline"
                                    size={20}
                                    color={theme.COLORS.BLOCK}
                                />
                                <CommentReplyModal
                                    visible={replyModal}
                                    visibilitySetter={setReplyModal}
                                    postId={post.id}
                                />
                            </Block>
                            <Text style={{fontWeight: '500'}} size={15} color={theme.COLORS.BLOCK}>
                                {post.comments_freq}
                            </Text>
                        </Pressable>
                        <Block row center>
                            <Block style={{marginRight: 5}} center>
                                <Ionicons name="share-outline" size={22} color={theme.COLORS.BLOCK}/>
                            </Block>
                            <Text style={{fontWeight: '500'}} size={15} color={theme.COLORS.BLOCK}>
                                {'Share'}
                            </Text>
                        </Block>
                        <Block row center>
                            <Ionicons
                                name="ios-ellipsis-horizontal"
                                size={21}
                                color={theme.COLORS.BLOCK}
                            />
                        </Block>
                    </Block>
                </Block>
            </TouchableOpacity>
        </Block>
    )

}

const styles = StyleSheet.create({
    card: {
        padding: 10,
        backgroundColor: theme.COLORS.WHITE

    },
    cardContent: {
        padding: theme.SIZES.BASE * 0.3,
        flexDirection: "column"
    },
    cardIcon: {
        padding: theme.SIZES.BASE * 0.5 ,
    },
    bottomActions: {
        justifyContent: "space-between",
    },
    title:{
      marginBottom: 8
    },
    titleText:{
      fontSize: 17
    },
    contentText: {
        color: theme.COLORS.BLOCK
    },
    groupText: {
        fontWeight: '500',
    }

})


