import React, {useState, useContext} from 'react'
import {Block, Button, Icon, Input, NavBar} from "galio-framework";
import {Modal, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions} from "react-native";
import theme from "../theme";
import {firebase} from '../firebase'
import {useNavigation} from "@react-navigation/native";
import { addNewPost } from '../services/PostService'
import AuthenticationContext from "../contexts/AuthenticationContext";

const { height } = Dimensions.get("window")

function RenderedAddButton(props) {
    const { AddButton, setter } = props
    if(AddButton()) return (
        <TouchableOpacity onPress={() => setter(true)}>
            <AddButton/>
        </TouchableOpacity>
    )
    else return (
        <TouchableOpacity onPress={() => setter(true)} style={styles.createPostButton}>
            <Icon family="Ionicons" name="add" size={25}/>
        </TouchableOpacity>
    )
}

export default function (props) {

    const [createPostModalVisible, setCreatePostModalVisible] = useState(false);
    const [postTitle, setPostTitle] = useState('')
    const [postContent, setPostContent] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const { subreadit, addButton } = props
    const navigation = useNavigation()
    const authentication = useContext(AuthenticationContext)

    //AddButton - Custom button to open the create modal. Default will use + icon
    //Subreadit - The subreadit to add the post to

    function addPost() {
        if(!authentication.user){
            navigation.push("Login")
            setCreatePostModalVisible(false)
        }
        try {
            const key = addNewPost(subreadit,authentication.user.displayName, postTitle, postContent)
            // console.log(key)
            setCreatePostModalVisible(false)
            setErrorMessage('')
            setPostContent('')
            setPostTitle('')
            navigation.push("Post",{postId: key})

        }catch (e) {
            console.error(e)
            if (e.code === 3) {
                // TODO User not logged in. Redirect to login
                console.error("User not logged in. Should redirect to login")
                // navigation.push("Login")
            }
            else setErrorMessage(e.message)
        }
    }

    return(
        <Block>
            <RenderedAddButton AddButton={() => addButton} setter={setCreatePostModalVisible}/>
            <Modal
                visible={createPostModalVisible}
                onRequestClose={() => {setCreatePostModalVisible(false)}}
            >
                <NavBar
                    title="Create new post"
                    left={(
                        <TouchableOpacity onPress={() => setCreatePostModalVisible(false)}>
                            <Icon
                                name="close"
                                family="Ionicons"
                                size={20}
                                color={theme.COLORS.IOS}
                            />
                        </TouchableOpacity>
                    )}
                />
                <Block safe flex style={styles.modalContainer}>
                    <Input style={styles.input} value={postTitle} onChangeText={text => setPostTitle(text)} label={"Post Title"} placeholder="Post Title"/>
                    <Block flex={4}>
                        <Input style={styles.input} value={postContent} onChangeText={text => setPostContent(text)} multiline numberOfLines={7} label={"Content"} placeholder="Content"/>
                    </Block>
                    <Text>This will be posted on r/{subreadit}</Text>
                    <Text style={{color: 'red'}}>{errorMessage}</Text>
                    <Block right>
                        <Button onPress={addPost}>Create Post</Button>
                    </Block>
                </Block>
            </Modal>
        </Block>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        padding: 20
    },
    input: {
        borderRadius: 0
    }
})
