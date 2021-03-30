import React, {useContext, useState} from 'react'
import {
    ActivityIndicator,
    Button,
    Platform,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    Alert
} from "react-native";
import {Icon, NavBar} from "galio-framework";
import theme from "../theme";
import {Comment} from "./Comment";
import Modal from "react-native-modal";
import AuthenticationContext from "../contexts/AuthenticationContext";
import { addComment } from "../services/CommentsService";
import PostContext from "../contexts/PostCommentsContext";

function RenderComment({replyComment}) {
    if(replyComment) return (
        <View>
            {replyComment && (<Comment preview={true} comment={replyComment}/>)}
        </View>
    )
    return null
}

export default function({ replyComment, visible, visibilitySetter, commentPath, postId }) {

    const [ commentText, setCommentText ] = useState('')
    const [ addingComment, setAddingComment ] = useState(false)

    const { user } = useContext(AuthenticationContext)
    const { post, refreshPost } = useContext(PostContext)

    const createComment = async () => {
        setAddingComment(true)
        try{
            const recipient = commentPath != null ? replyComment.user.displayName : post.user.displayName
            await addComment(
                postId, commentText, user, commentPath, post.title, post.subreadit, recipient
            )
            visibilitySetter(false)
            refreshPost()
        } catch (err){
            console.error(err)
            Alert.alert("Something went wrong. Please try again later")
        } finally {
            setAddingComment(false)
        }
    }

    return (
        <Modal
            isVisible={visible}
            swipeDirection={['up','down']}
            onSwipeComplete={() => visibilitySetter(false)}
            animationInTiming={200}
            animationOutTiming={200}
            onModalHide={() => {
                setCommentText('')
                setAddingComment(false)
            }}
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
                    addingComment ?
                        (<ActivityIndicator size={"small"}/>) :
                        (<Button title={"Post"} onPress={createComment}/>)
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
