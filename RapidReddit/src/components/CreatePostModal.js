import React, {useState, useContext} from 'react'
import {Block, Icon, NavBar} from "galio-framework";
import {Modal, Text, TextInput, Button, TouchableOpacity, StyleSheet, View} from "react-native";
import {Input} from 'react-native-elements'
import theme from "../theme";
import {useNavigation} from "@react-navigation/native";
import { addNewPost } from '../services/PostService'
import AuthenticationContext from "../contexts/AuthenticationContext";

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
                navigation.push("Login")
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

                <Block safe flex style={styles.modalContainer}>
                    <NavBar
                        title="Create Post"
                        titleStyle={{fontSize: 19, fontWeight: 'bold'}}
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
                        right={(<Button title={"Post"} onPress={addPost}/>)}
                    />
                    <View style={styles.content}>
                        <Text>
                            <Text style={{fontSize: 17}}>This will be posted on </Text>
                            <Text style={{fontWeight: '700', fontSize: 18}}>r/{subreadit}</Text>
                        </Text>
                        <Input
                            containerStyle={{marginTop: 25}}
                            onChangeText={(text) => setPostTitle(text)}
                            value={postTitle}
                            label='Title'
                            placeholder='Set Post Title Here'
                        />
                        <Input
                            containerStyle={{marginTop: 20}}
                            multiline={true}
                            numberOfLines={10}
                            onChangeText={(text) => setPostContent(text)}
                            value={postContent}
                            label='Content'
                            placeholder='Write Post Content Here'
                        />
                    </View>
                    <Text style={{color: 'red'}}>{errorMessage}</Text>
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
    },
    content: {
        backgroundColor: 'white',
        padding: 17,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
    },
})

