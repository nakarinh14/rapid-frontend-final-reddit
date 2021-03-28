import React, {useEffect, useState} from 'react';
import {StyleSheet, Platform, TouchableOpacity, ScrollView, View} from 'react-native';
import {Block, NavBar, Text} from 'galio-framework';
import theme from '../theme';
import * as SubredditService from '../services/SubredditService'
import * as SubredditUserService from '../services/SubredditUserService'
import {Input} from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';



export const EditSubreddit = ({ route, navigation}) => {

    const {subreaditName} = route.params

    const[subreadit, setSubreadit] = useState({
        name: "",
        description: "",
        subscribers: 0,
        date_created: 0,
     })

     const [subreaditRoles, setSubreaditRoles] = useState({})
     const [newSubreaditName, setSubreaditName] = useState("")
     const [subreaditDescription, setSubreaditDescription] = useState("")
     const [newRoles, setNewRoles] = useState({})

     const updateSubreadit = () => {
         SubredditService.updateSubreadit(subreaditName, newSubreaditName, subreaditDescription, newRoles)
     }

     const isModified = () => {
         window.console.log(subreadit)
         window.console.log(JSON.stringify(subreaditRoles))
         window.console.log(subreaditName + " " + subreaditDescription + " " + JSON.stringify(newRoles))
         return subreadit.name != subreaditName
         || subreadit.description != subreaditDescription
         || JSON.stringify(subreaditRoles) != JSON.stringify(newRoles)
     }


    useEffect(() => {
        const subreaditRef = SubredditService.getRefForSubreddit(subreaditId)
        const newRolesRef = SubredditUserService.getRefForSubredditRoles(subreaditId)

        subreaditRef.on('value', snapshot => {
            if (snapshot.exists()){
                var data = snapshot.val();
                setSubreadit(data)
                setSubreaditName(data.name)
                setSubreaditDescription(data.description)
                window.console.log("data: ")
                window.console.log("subreadit is now")
                window.console.log(subreadit)
            }

        })

        newRolesRef.get().then(function(snapshot) {
            if (snapshot.exists()) {
                var roles = snapshot.val()
                setSubreaditRoles(roles)
                setNewRoles(roles)
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
                    {Object.keys(newRoles || []).map((key, idx) =>
                            <Block>
                            <Block style={styles.content} marginVertical={10}>
                                <Text style={styles.m2}>{key}</Text>
                                <Text style={styles.m2}>{newRoles[key]}</Text>
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
            <View row center style={[styles.footer, {justifyContent: "center"}]}>
            {isModified() ?
            (<TouchableOpacity style={{ height: 50, marginTop: 10, backgroundColor: "cyan", justifyContent: "center" }} onPress={() => {updateSubreadit()}}>
                <Text center color="white">Save</Text>
            </TouchableOpacity>) : null}
            {!isModified() ?
            (<TouchableOpacity style={{ height: 50, marginTop: 10, backgroundColor: "grey", justifyContent: "center" }}>
                <Text center color="white">Save</Text>
            </TouchableOpacity>) : null}
            </View>
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
    },
    footer: {
        position: "absolute",
        left: 0,
        bottom: 0,
        width: "100%",
    }
});
