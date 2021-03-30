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

    const userVote = user && post.user_upvotes && post.user_upvotes[user.displayName]

    const upvotedColor = (bool) => {
        if(bool == null){
            bool = userVote
        }
        if(userVote == null || userVote !== bool) {
            return theme.COLORS.GREY
        }
        return userVote ? 'tomato' : '#4791db'
    }

    const upvoteArrow = (bool) => {
        const arrowType = bool ? 'up' : 'down'
        if(userVote == null || userVote !== bool){
            return `arrow-${arrowType}-bold-outline`
        } else if (userVote) {
            return `arrow-${arrowType}-bold`
        } else {
            return `arrow-${arrowType}-bold`
        }
    }

    const onPressPost = () => {
        navigation.push("Post", {postId: post.id})
    }

    const onPressKarma = (bool) =>{
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        votePost(post.id, user.displayName,bool)
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
                            <Pressable hitSlop={3} onPress={() => onPressKarma(true)}>
                                <MaterialCommunityIcons
                                    size={24}
                                    name={upvoteArrow(true)}
                                    color={upvotedColor(true)}
                                />
                            </Pressable>
                            <Block>
                                <Text
                                    size={15}
                                    color={upvotedColor()}
                                    style={{marginHorizontal: 6, fontWeight: '500'}}
                                >
                                    {post.karma}
                                </Text>
                            </Block>
                            <Pressable hitSlop={3} onPress={() => onPressKarma(false)}>
                                <MaterialCommunityIcons
                                    size={24}
                                    name={upvoteArrow(false)}
                                    color={upvotedColor(false)}
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


