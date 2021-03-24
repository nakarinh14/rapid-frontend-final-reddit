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

    const {subreaditId} = route.params

    const [subreadit, setSubreadit] = useState({
        name: "",
        description: "",
        subscribers: 0,
        date_created: 0
     });

     const [subreaditName, setSubreaditName] = useState("")
     const [subreaditDescription, setSubreaditDescription] = useState("")
     const [subreaditRoles, setSubreaditRoles] = useState({})

    useEffect(() => {


        const subreaditRef = SubredditService.getRefForSubreddit(subreaditId)
        const subreaditRolesRef = SubredditUserService.getRefForSubredditRoles(subreaditId)

        subreaditRef.on('value', snapshot => {
            if (snapshot.exists()){
                var data = snapshot.val();
                setSubreadit(data)
                setSubreaditName(data.name)
                setSubreaditDescription(data.description)
                window.console.log("data: ")
                window.console.log(data)
            }
            
        })

        subreaditRolesRef.get().then(function(snapshot) {
            if (snapshot.exists()) {
                var roles = snapshot.val()
                setSubreaditRoles(roles)
            }
            else {
                window.console.log("Unable to retrieve user roles for this subreddit")
            }
          }).catch(function(error) {
            console.error(error);
          });

        return function cleanup() {
            subreaditRef.off('value')
        }


    },[])

    return (
        <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
            <NavBar

                title={subreadit.name}
                style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null}

            />
            <ScrollView>
            <Block>
                <Input
                    containerStyle={{marginTop: 25}}
                    onChangeText={(text) => setSubreaditName(text)}
                    value={subreaditName}
                    label='Name'
                    defaultValue={subreaditName}
                    labelStyle={{color: "grey"}}
                    inputContainerStyle={{color: "grey"}}
                />
                <Input
                    containerStyle={{marginTop: 20}}
                    multiline={true}
                    onChangeText={(text) => setSubreaditDescription(text)}
                    value={subreaditDescription}
                    label='Description'
                    defaultValue={subreaditDescription}
                    labelStyle={{color: "grey"}}
                />
                <Block marginHorizontal={10}>
                    <Text bold color="grey" size={18} marginHorizontal={20}>user roles</Text>
                    <View style={styles.hr} marginTop={20}/>
                    {Object.keys(subreaditRoles || []).map((key, idx) =>
                            <Block>
                            <Block style={styles.content} marginVertical={10}>
                                <Text style={styles.m2}>{key}</Text>
                                <Text style={styles.m2}>{subreaditRoles[key]}</Text>
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
