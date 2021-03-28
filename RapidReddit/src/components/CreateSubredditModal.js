import React, {useState, useContext} from 'react'
import {Block, Icon, NavBar} from "galio-framework";
import {Modal, Text, TouchableOpacity, StyleSheet, View} from "react-native";
import theme from "../theme";
import {Input} from 'react-native-elements'
import AuthenticationContext from "../contexts/AuthenticationContext";
import * as SubredditService from '../services/SubredditService'

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

export default function ({ addButton, navigation}) {

    const [createPostModalVisible, setCreatePostModalVisible] = useState(false);
    const [subreaditName, setSubreaditName] = useState('')
    const [subredditDescription, setSubredditDescription] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const { user } = useContext(AuthenticationContext)

    //AddButton - Custom button to open the create modal. Default will use + icon
    //Subreadit - The subreadit to add the post to

    async function createSubreddit() {
        try {
            await SubredditService.addNewSubreddit(subreaditName, user, subredditDescription)
            setCreatePostModalVisible(false)
            navigation.push("Subreddit", {subreaditName})
        } catch (e) {
            if (e.code === 3) {
                // TODO User not logged in. Redirect to login
                console.log("User not logged in. Should redirect to login")
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
                onRequestClose={() => setCreatePostModalVisible(false)}
            >
                <Block safe flex style={styles.modalContainer}>
                    <NavBar
                        title="Create Subreadit"
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
                        right={(<TouchableOpacity onPress={createSubreddit} >
                            <Text style={{color: 'blue', fontSize: 16}}>
                                Create
                            </Text>
                        </TouchableOpacity>)}
                    />
                    <View style={styles.content}>
                        <Input
                            containerStyle={{marginTop: 25}}
                            onChangeText={(text) => setSubreaditName(text)}
                            value={subreaditName}
                            label='Name'
                            placeholder='Set Subreadit Name Here'
                        />
                        <Input
                            containerStyle={{marginTop: 20}}
                            multiline={true}
                            numberOfLines={10}
                            onChangeText={(text) => setSubredditDescription(text)}
                            value={subredditDescription}
                            label='Description'
                            placeholder='Set Community Description Here'
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
