import React, {useContext, useState} from 'react';
import {Button, View, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import { ListItem, Icon } from 'react-native-elements'
import CommentReplyModal from "./CommentReplyModal";
import AuthenticationContext from "../contexts/AuthenticationContext";
import {useNavigation} from "@react-navigation/native";
import {voteComment} from "../services/CommentsService";
import PostContext from "../contexts/PostCommentsContext";

const list = [
    {
        title: 'Upvote',
        icon: 'ios-arrow-up',
        type: 'ionicon'

    },
    {
        title: 'Downvote',
        icon: 'ios-arrow-down',
        type: 'ionicon'
    },
    {
        title: 'Reply',
        icon: 'ios-arrow-undo-outline',
        type: 'ionicon'
    },
]

export const CommentEllipsisModal = ({isModalVisible, closeModal, previewCommentModal, post}) => {
    const [isReplyModalVisible, setReplyModalVisible] = useState(false)
    const [listenToReply, setListenerReply] = useState(false)

    const { message, path, postId, commentId } = previewCommentModal
    const navigation = useNavigation()
    const {user} = useContext(AuthenticationContext)
    const { refreshPost } = useContext(PostContext)

    const actionOnClick = (action) => {
        closeModal(false)
        if (!user) {
            return navigation.push("Login")
        }
        action()
    }

    async function applyKarmaAction(upvote) {
        // upvote = true: upvoting, false: downvoting
        const recipient = message.user.displayName
        try {
            await voteComment(
                commentId,
                user.displayName,
                upvote,
                recipient,
                message.post_id,
                message.post_subreadit
            )
        } catch(err) {
            console.log(err)
        }
        refreshPost()
    }

    const onClickReply = () => actionOnClick(() => setListenerReply(true))
    const upvote = () => actionOnClick(() => applyKarmaAction(true))
    const downvote = () => actionOnClick(() => applyKarmaAction(false))

    const eventListener = () => {
        if(listenToReply){
            setListenerReply(false)
            setReplyModalVisible(true)
        }
    }

    const onClickOrders = [upvote, downvote, onClickReply]

    return (
        <>
            <CommentReplyModal
                visible={isReplyModalVisible}
                visibilitySetter={setReplyModalVisible}
                replyComment={message}
                commentPath={path}
                postId={postId}
                post={post}
            />
            <Modal
                isVisible={isModalVisible}
                swipeDirection={['up', 'left', 'right', 'down']}
                onSwipeComplete={closeModal}
                animationInTiming={200}
                animationOutTiming={200}
                onModalHide={eventListener}
            >
                <View style={styles.content}>
                    {
                        list.map((item, i) => (
                            <ListItem
                                Component={TouchableOpacity}
                                key={i}
                                bottomDivider
                                onPress={onClickOrders[i]}
                            >
                                <Icon name={item.icon} type={item.type} />
                                <ListItem.Content>
                                    <ListItem.Title>{item.title}</ListItem.Title>
                                </ListItem.Content>
                                <ListItem.Chevron />
                            </ListItem>
                        ))
                    }
                    <Button testID={'close-button'} title="Close" onPress={closeModal}/>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    view: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    content: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    contentText: {
        fontSize: 20,
        marginBottom: 12,
    },
});

export default CommentEllipsisModal;
