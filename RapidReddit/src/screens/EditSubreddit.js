import React, {useEffect, useState} from 'react';
import {StyleSheet, Platform, TouchableOpacity, ScrollView, View} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {Block, NavBar, Icon, Text} from 'galio-framework';
import theme from '../theme';
// Not really reuseable. Might need to create new one here.
import SubredditAbout from "../components/UserComments";
import UserPosts from "../components/UserPosts"
import {firebase} from "../firebase";
import PostListComponent from "../components/PostListComponent";
import * as SubredditService from '../services/SubredditService'
import * as SubredditUserService from '../services/SubredditUserService'
import {Input} from 'react-native-elements'
import { Subreddit } from './Subreddit';
import { Ionicons } from '@expo/vector-icons';



export const EditSubreddit = ({ route, navigation}) => {

    const {subredditId} = route.params

    const [subreddit, setSubreddit] = useState({
        name: "",
        description: "",
        subscribers: 0,
        date_created: 0
     });

     const [subredditName, setSubredditName] = useState("")
     const [subredditDescription, setSubredditDescription] = useState("")
     const [subredditRoles, setSubredditRoles] = useState({})

    useEffect(() => {


        const subredditRef = SubredditService.getRefForSubreddit(subredditId)
        const subredditRolesRef = SubredditUserService.getRefForSubredditRoles(subredditId)

        subredditRef.on('value', snapshot => {
            data = snapshot.val();
            setSubreddit(data)
            setSubredditName(subreddit.name)
            setSubredditDescription(subreddit.description)
            window.console.log("data: ")
            window.console.log(data)
        })

        subredditRolesRef.get().then(function(snapshot) {
            if (snapshot.exists()) {
                var roles = snapshot.val()
                setSubredditRoles(roles)
            }
            else {
                window.console.log("Unable to retrieve user roles for this subreddit")
            }
          }).catch(function(error) {
            console.error(error);
          });

        return function cleanup() {
            subredditRef.off('value')
        }


    },[])

    return (
        <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
            <NavBar

                title={subreddit.name}
                style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null}

            />
            <ScrollView>
            <Block>
                <Input
                    containerStyle={{marginTop: 25}}
                    onChangeText={(text) => setSubredditName(text)}
                    value={subredditName}
                    label='Name'
                    defaultValue={subredditName}
                    labelStyle={{color: "grey"}}
                    inputContainerStyle={{color: "grey"}}
                />
                <Input
                    containerStyle={{marginTop: 20}}
                    multiline={true}
                    onChangeText={(text) => setSubredditDescription(text)}
                    value={subredditDescription}
                    label='Description'
                    defaultValue={subredditDescription}
                    labelStyle={{color: "grey"}}
                />
                <Block marginHorizontal={10}>
                    <Text bold color="grey" size={18} marginHorizontal={20}>user roles</Text>
                    <View style={styles.hr} marginTop={20}/>
                    {Object.keys(subredditRoles || []).map((key, idx) =>
                            <Block>
                            <Block style={styles.content} marginVertical={10}>
                                <Text style={styles.m2}>{key}</Text>
                                <Text style={styles.m2}>{subredditRoles[key]}</Text>
                                <Block row>
                                    <Ionicons name="pencil-outline" size={22} color={theme.COLORS.BLOCK}/>
                                    <Ionicons name="trash-outline" size={22} color={theme.COLORS.BLOCK}/>
                                </Block>
                            </Block>
                            <View style={styles.hr}/>
                            </Block>
                        )}

                    <Block row center marginVertical={10}>
                        <Ionicons name="add-outline" size={22} color={theme.COLORS.BLOCK}/>
                        <Text color="grey">Add new user</Text>
                    </Block>
                </Block>
            </Block>
            </ScrollView>

        </Block>
    );
}

const styles = StyleSheet.create({
    contentCenter: {
        display: "flex",
        justifyContent: "center"
    },
    m2: {
        marginHorizontal: 10
    },
    hr: {
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1,   
    },
    content: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: "row"
    }
});
