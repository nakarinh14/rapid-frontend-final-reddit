import React, {useContext} from 'react';
import {Block, Text} from "galio-framework";
import {StyleSheet, View, Pressable} from "react-native";
import theme from "../theme";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";
import {getDisplayDate} from "../utils/post-date";
import AuthenticationContext from "../contexts/AuthenticationContext";
import {voteComment} from "../services/CommentsService";
import CommentTreeContext from "../contexts/CommentTreeContext";
import PostCommentsContext from "../contexts/PostCommentsContext";
import * as Haptics from 'expo-haptics';

const indentColor = (depth) => {
    const colors = ['red', 'orange', '#e9de1a', 'green', 'purple']
    if (depth > 0) {
        return {borderLeftColor: colors[(depth - 1) % colors.length], ...styles.indented}
    }
    return null
}

const paddedFlex = (depth) => {
    const idx = depth ? depth : 0
    return idx === 0 ? 0 : 4 + ((idx-1)*2)
}

export const Comment = ({comment, depth, preview, path, hide}) => {

    const navigation = useNavigation();
    const {  modalFunction } = useContext(CommentTreeContext);
    const { user } = useContext(AuthenticationContext)
    const { refreshPost } = useContext(PostCommentsContext)

    const bg = preview ? {backgroundColor: theme.COLORS.PAPER} : null
    const emptyPadded = paddedFlex(depth)
    const padded = 100 - emptyPadded

    const commentId = preview ? null : path.slice(path.lastIndexOf('/')+1)

    const ellipsisOnClick = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        modalFunction(comment, path, commentId)
    }

    const upvote = async () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        if(!user) {
            return navigation.push('Login')
        }
        try {
            await voteComment(
                commentId,
                user.displayName,
                true,
                comment.user.displayName,
                comment.post_id,
                comment.post_subreadit
            )
        } catch(err) {
            console.log(err)
        } finally {
            refreshPost()
        }
    }

    const userVote = user && comment.user_upvotes && comment.user_upvotes[user.displayName]
    const upvotedColor = () => {
        if(userVote == null) {
            return theme.COLORS.MUTED
        }
        return userVote ? 'tomato' : '#4791db'
    }

    const upvoteArrow = () => {
        if(userVote == null){
            return "arrow-up-bold-outline"
        } else if (userVote) {
            return "arrow-up-bold"
        } else {
            return "arrow-down-bold"
        }
    }

    return (
        <>
            <Block style={{flex: emptyPadded}} />
            <Block style={[styles.commentBlock, {flex: padded}, bg]} >
                {depth ? <View style={[styles.line]}/> : null}
                <Block style={[styles.box, indentColor(depth)]}>
                    <Block style={styles.topInfo}>
                        <Block style={styles.topLeftFlex}>
                            <Pressable hitSlop={2} onPress={() => navigation.push("User", {username: comment.user.displayName})}>
                                <View>
                                    <Text style={styles.titleText}>
                                        {comment.user.displayName}
                                    </Text>
                                </View>
                            </Pressable>
                            <Pressable hitSlop={2} onPress={upvote}>
                                <View style={styles.upvotes}>
                                    <MaterialCommunityIcons
                                        name={upvoteArrow()}
                                        color={upvotedColor()}
                                    />
                                    <Text style={[styles.timestampText, {color: upvotedColor()}]} >
                                        {comment.upvotes}
                                    </Text>
                                </View>
                            </Pressable>
                            {hide && <Text style={{color: 'grey', fontSize: 12}}> (Hidden)</Text>}
                            </Block>
                        <Block style={styles.topRightFlex}>
                            {preview ? null :
                                <Pressable
                                    hitSlop={15}
                                    onPress={() => ellipsisOnClick()}
                                >
                                    <View style={{marginRight: 7}}>
                                        <Ionicons
                                            name="ios-ellipsis-horizontal"
                                            size={22}
                                            color={theme.COLORS.MUTED}
                                        />
                                    </View>
                                </Pressable>
                            }
                            <View>
                                <Text style={styles.timestampText}>
                                    {getDisplayDate(comment.timestamp)}
                                </Text>
                            </View>
                        </Block>
                    </Block>
                    {!hide &&  <Text style={styles.commentText}>{comment.body}</Text>}
                </Block>
            </Block>
        </>
    )
}

const styles = StyleSheet.create({
    titleText: {
        fontWeight: '600',
        color: theme.COLORS.BLACK,
        fontSize: 14.6
    },
    captionText: {
        color: theme.COLORS.GREY
    },
    commentText: {
        marginTop: 7,
        color: theme.COLORS.BLACK,
        fontSize: 14.6
    },
    timestampText: {
        color: theme.COLORS.GREY
    },
    topLeftFlex: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: "row",
    },
    topInfo: {
        marginTop: theme.SIZES.BASE * 0.175,
        marginBottom: theme.SIZES.BASE * 0.175,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: "row",
    },
    caption: {
        flexDirection: "row",
    },
    topRightFlex: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: "row",
        marginRight: 10
    },
    upvotes: {
        alignItems: 'center',
        flexDirection: "row",
        marginLeft: 5
    },
    box: {
        paddingLeft: 10,
        justifyContent: 'center',
        paddingBottom: 5,
    },
    line: {
        borderBottomColor: theme.COLORS.LINE,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 10
    },
    indented: {
        borderLeftWidth: 2,
        borderTopLeftRadius: 1,
        borderBottomLeftRadius: 1,
    },
    commentBlock: {
        marginBottom: 10,
    }
});
