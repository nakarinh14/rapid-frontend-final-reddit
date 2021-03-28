import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Platform, TouchableOpacity, ScrollView} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {Block, NavBar, Icon, Text} from 'galio-framework';
import theme from '../theme';
import UserComments from "../components/UserComments";
import UserPosts from "../components/UserPosts"
import {firebase} from "../firebase";
import "firebase/auth";
import AuthenticationContext from "../contexts/AuthenticationContext";
import {UnauthenticatedScreen} from "./UnauthenticatedScreen";
import {getDisplayDate} from "../utils/post-date";

const profile = {
    username: "Loading",
    comment_karma: 0,
    post_karma: 0,
    date_created: "Loading"
};

const Tab = createMaterialTopTabNavigator();

export const UserProfile = ({ route, navigation }) => {
    const { user } = useContext(AuthenticationContext)
    const { owner, username } = route.params

    if(owner && !user){
        return (
           <UnauthenticatedScreen navigation={navigation} />
        )
    }

    const displayName = owner ? user?.displayName : username
    return (
        <RenderProfile
            owner={owner}
            username={displayName}
            navigation={navigation}
        />
    );
}

const RenderProfile = ({navigation, owner, username}) => {
    // If it is owner, use current displayName, else just use provided username from navigation path
    const [userStats, setUserStats] = useState(profile)
    console.log(username)
    useEffect(() => {
        if(username){
            const ref = firebase.database().ref(`user_profile/${username}/stats`)
            const listener = ref.on('value', (snapshot) => {
                if(snapshot.exists()){
                    const data = snapshot.val()
                    setUserStats({
                        username,
                        comment_karma: data.comment_karma,
                        post_karma: data.post_karma,
                        date_created: getDisplayDate(data.date_created)
                    })
                }
            })
            return () => ref.off('value', listener)
        }
    }, [username])

    return (
        <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
            <NavBar
                title={username}
                left={!owner ?
                    (<TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon
                            name="arrow-left"
                            family="feather"
                            size={24}
                            color={theme.COLORS.ICON}
                        />
                    </TouchableOpacity>): null
                }
                right={ owner ?
                    <TouchableOpacity onPress={() => firebase.auth().signOut()}>
                        <Icon
                            name="log-out"
                            family="feather"
                            size={20}
                            color={theme.COLORS.ICON}
                        />
                    </TouchableOpacity> : null
                }
                style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null}
            />
            <ScrollView>
                <Block
                    style={styles.achievements}
                >
                    <Block style={styles.displayScores} >
                        <Text style={styles.subStatTitle}>{userStats.comment_karma}</Text>
                        <Text color={theme.COLORS.GREY}>Comment</Text>
                        <Text color={theme.COLORS.GREY}>Upvotes</Text>
                    </Block>
                    <Block style={styles.displayScores}>
                        <Text style={styles.subStatTitle}>{userStats.post_karma}</Text>
                        <Text color={theme.COLORS.GREY}>Post</Text>
                        <Text color={theme.COLORS.GREY}>Upvotes</Text>

                    </Block>
                    <Block style={styles.displayScores}>
                        <Text style={styles.subStatTitle}>{userStats.date_created}</Text>
                        <Text color={theme.COLORS.GREY}>Age</Text>
                    </Block>
                </Block>
                <Block flex>
                    <Tab.Navigator>
                        <Tab.Screen
                            name="Posts"
                            component={UserPosts}
                            initialParams={{uid: username}}
                        />
                        <Tab.Screen
                            name="Comments"
                            component={UserComments}
                        />
                    </Tab.Navigator>
                </Block>
            </ScrollView>
        </Block>
    )
}


const styles = StyleSheet.create({
    achievements: {
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: "stretch",
        marginVertical: 10,
    },
    subStatTitle: {
        marginBottom: theme.SIZES.BASE * 0.4,
        fontSize: 20,
        fontWeight: "500",
    },
    displayScores: {
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 100,
        flexDirection: "column",
        justifyContent: 'flex-start',
        alignItems: "center",
    },
    scene: {
        flex: 1,
    },
    attachTop:{
        top: 0,
        position: 'absolute'
    }
});
