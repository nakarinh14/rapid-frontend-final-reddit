import React, {useContext} from 'react';
import {Block, Text} from "galio-framework";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import theme from "../theme";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";
import {getDisplayDate} from "../utils/post-date";
import AuthenticationContext from "../contexts/AuthenticationContext";
import {voteComment} from "../services/CommentsService";
import CommentTreeContext from "../contexts/CommentTreeContext";
import PostCommentsContext from "../contexts/PostCommentsContext";

const indentColor = (depth) => {
    const colors = ['red', 'orange', '#e9de1a', 'green']
    if (depth > 0) {
        return {borderLeftColor: colors[depth - 1], ...styles.indented}
    }
    return null
}

const paddedFlex = (depth) => {
    const idx = depth ? depth : 0
    const indents = [0, 4, 6, 8, 10]
    return indents[idx]
}

export const Comment = ({comment, depth, preview, path}) => {

    const navigation = useNavigation();
    const { postId, modalFunction } = useContext(CommentTreeContext);
    const { user } = useContext(AuthenticationContext)
    const {updateComments} = useContext(PostCommentsContext)

    const bg = preview ? {backgroundColor: theme.COLORS.PAPER} : null
    const emptyPadded = paddedFlex(depth)
    const padded = 100 - emptyPadded

    const commentId = preview ? null : path.slice(path.lastIndexOf('/')+1)

    const ellipsisOnClick = () => {
        modalFunction(comment, path, commentId)
    }

    const upvote = async () => {
        try {
            await voteComment(commentId, user.displayName, true)
        } catch(err) {
            console.log(err)
        }
        updateComments()
    }

    const userVote = comment.user_upvotes && comment.user_upvotes[user.displayName]
    const upvotedColor = () => {
        if(userVote == null) {
            return theme.COLORS.MUTED
        }
        return userVote ? 'tomato' : 'blue'
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
        <Block style={{flexDirection: "row", alignItems: 'center', justifyContent: 'flex-end'}}>
            <Block style={{flex: emptyPadded}} />
            <Block style={[styles.commentBlock, {flex: padded}, bg]} >
                {depth ? <View style={[styles.line]}/> : null}
                <Block style={[styles.box, indentColor(depth)]}>
                    <Block style={styles.topInfo}>
                        <Block style={styles.topLeftFlex}>
                            <TouchableOpacity onPress={() => navigation.push("User", {username: comment.user.displayName})}>
                                <View>
                                    <Text style={styles.titleText}>
                                        {comment.user.displayName}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={upvote}>
                                <View style={styles.upvotes}>
                                    <MaterialCommunityIcons
                                        name={upvoteArrow()}
                                        color={upvotedColor()}
                                    />
                                    <Text style={[styles.timestampText, {color: upvotedColor()}]} >
                                        {comment.upvotes}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            </Block>
                        <Block style={styles.topRightFlex}>
                            {preview ? null :
                                <TouchableOpacity
                                    onPress={() => ellipsisOnClick()}
                                >
                                    <View style={{marginRight: 7}}>
                                        <Ionicons
                                            name="ios-ellipsis-horizontal"
                                            size={22}
                                            color={theme.COLORS.MUTED}
                                        />
                                    </View>
                                </TouchableOpacity>
                            }
                            <View>
                                <Text style={styles.timestampText}>
                                    {getDisplayDate(comment.timestamp)}
                                </Text>
                            </View>
                        </Block>
                    </Block>
                    <Text style={styles.commentText}>
                        {comment.body}
                    </Text>
                </Block>
            </Block>
        </Block>
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
