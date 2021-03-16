import React, {useContext, useState} from 'react'
import {ActivityIndicator, Button, Platform, StyleSheet, TextInput, TouchableOpacity, View, ToastAndroid} from "react-native";
import {Icon, NavBar} from "galio-framework";
import theme from "../theme";
import {Comment} from "./Comment";
import Modal from "react-native-modal";
import AuthenticationContext from "../contexts/AuthenticationContext";
import { addComment } from "../services/CommentsService";

function RenderComment({replyComment}) {
    if(replyComment) return (
        <View>
            {replyComment && (<Comment preview={true} comment={replyComment}/>)}
        </View>
    )
    else return null
}

export default function({ replyComment, visible, visibilitySetter, postId, commentPath }) {

    const [ commentText, setCommentText ] = useState('')
    const [ addingComment, setAddingComment ] = useState(false)
    // console.log('Comment path:',commentPath," post ID: ",postId)

    const authentication = useContext(AuthenticationContext)

    function createComment() {
        setAddingComment(true)
        addComment(postId,commentText,'username',commentPath).then(() => {
            setAddingComment(false)
            visibilitySetter(false)
        }).catch((error) => {
            console.error(error)
            setAddingComment(false)
            ToastAndroid.show("Something went wrong. Please try again later", ToastAndroid.SHORT)
        })
    }

    return (
        <Modal
            isVisible={visible}
            swipeDirection={['up','down']}
            onSwipeComplete={() => visibilitySetter(false)}
            animationInTiming={200}
            animationOutTiming={200}
            onModalHide={() => setCommentText('')}
            avoidKeyboard={true}
            onRequestClose={() => visibilitySetter(false)}
        >
            <NavBar
                title={"New Comment"}
                left={(
                    <TouchableOpacity onPress={() => visibilitySetter(false)}>
                        <Icon
                            name="close"
                            family="Ionicons"
                            size={20}
                            color={theme.COLORS.IOS}
                        />
                    </TouchableOpacity>
                )}
                right={
                    addingComment?(<ActivityIndicator size={"small"}/>):(<Button title={"Post"} onPress={createComment}/>)
                }
                style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null}
            />
            <View style={styles.content}>
                <TextInput
                    multiline={true}
                    numberOfLines={10}
                    onChangeText={(text) => setCommentText(text)}
                    value={commentText}
                    placeholder='Add a Comment'
                    style={{marginBottom: 50}}
                />
                <RenderComment replyComment={replyComment}/>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    view: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    content: {
        backgroundColor: 'white',
        padding: 22,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
    },
    contentText: {
        fontSize: 20,
        marginBottom: 12,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: "flex-end",
        backgroundColor: 'white',
    }

});
