import React, {useState, useContext} from 'react'
import {Block, Button, Icon, Input, NavBar} from "galio-framework";
import {Modal, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions} from "react-native";
import theme from "../theme";
import {firebase} from '../firebase'
import {useNavigation} from "@react-navigation/native";
import { addNewPost } from '../services/PostService'
import AuthenticationContext from "../contexts/AuthenticationContext";
import * as SubredditService from '../services/SubredditService'

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
    const [subredditName, setSubredditName] = useState('')
    const [subredditDescription, setSubredditDescription] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const { subreadit, addButton } = props
    const navigation = useNavigation()
    const authentication = useContext(AuthenticationContext)

    //AddButton - Custom button to open the create modal. Default will use + icon
    //Subreadit - The subreadit to add the post to

    function createSubreddit() {
        try {
            SubredditService.addNewSubreddit(subredditName, "", subredditDescription)
            setCreatePostModalVisible(false)

            // navigation.push("Post")
        }catch (e) {
            if (e.code === 3) {
                // TODO User not logged in. Redirect to login
                console.log("User not logged in. Should redirect to login")
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
                onRequestClose={() => setCreatePostModalVisible(false)}
            >
                <NavBar
                    title="Create new subreddit"
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
                    <Input value={subredditName} onChangeText={text => setSubredditName(text)} label={"Subreddit Name"} placeholder="Subreddit Name"/>
                    <Block flex={4}>
                        <Input value={subredditDescription} onChangeText={text => setSubredditDescription(text)} multiline numberOfLines={7} label={"Description"} placeholder="Description"/>
                    </Block>
                    <Text>r/{subredditName}</Text>
                    <Text style={{color: 'red'}}>{errorMessage}</Text>
                    <Block center>
                        <Button onPress={createSubreddit}>Create Subreddit</Button>
                    </Block>
                </Block>
            </Modal>
        </Block>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        padding: 20
    }
})
