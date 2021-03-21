import React, {useContext, useState} from 'react';
import {Button, View, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import { ListItem, Icon } from 'react-native-elements'
import CommentReplyModal from "./CommentReplyModal";
import AuthenticationContext from "../contexts/AuthenticationContext";
import {useNavigation} from "@react-navigation/native";


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


export const CommentEllipsisModal = ({isModalVisible, closeModal, previewCommentModal}) => {
    const [isReplyModalVisible, setReplyModalVisible] = useState(false)
    const [listenToReply, setListenerReply] = useState(false)
    const navigation = useNavigation()
    const {user} = useContext(AuthenticationContext)

    const actionOnClick = (action) => {
        closeModal(false)
        if (!user) {
            return navigation.push("Login")
        }
        action()
    }

    const onClickReply = () => actionOnClick(() => setListenerReply(true))
    const upvote = () => actionOnClick(() => {})
    const downvote = () => actionOnClick(() => {})

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
                replyComment={previewCommentModal.message}
                commentPath={previewCommentModal.path}
                postId={previewCommentModal.postId}
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
