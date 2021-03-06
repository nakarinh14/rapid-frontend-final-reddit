import React, {useEffect, useState} from 'react';
import {StyleSheet, Platform, TouchableOpacity, ScrollView} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {Block, NavBar, Icon, Text} from 'galio-framework';
import theme from '../theme';
import {UserComments} from "../components/UserComments";
import {UserPosts} from "../components/UserPosts"
import {firebase} from "../firebase";

const profile = {
    username: "xXXStonksToTheMoonXxx",
    comment_upvotes: 515,
    post_upvotes: 4012,
    account_age: "1y"
};

const Tab = createMaterialTopTabNavigator();

const useMockData = true

export const UserProfile = ({ route, navigation, uid }) => {

    const { owner } = route.params
    const [userStats, setUserStats] = useState(profile)

    useEffect(() => {
        if(useMockData){
            setUserStats(profile)
            return
        }
        const ref = firebase.database().ref(`user_profile/${uid}/stats`)
        ref.on('value', (snapshot) => {
            if(snapshot.exists()){
                setUserStats(snapshot.val())
            }
        })
    })

    return (
        <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
            <NavBar
                title={profile.username}
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
                style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null}
            />
            <ScrollView>
                <Block
                    style={styles.achievements}
                >
                    <Block style={styles.displayScores} >
                        <Text style={styles.subStatTitle}>{userStats.comment_upvotes}</Text>
                        <Text color={theme.COLORS.GREY}>Comment</Text>
                        <Text color={theme.COLORS.GREY}>Upvotes</Text>
                    </Block>
                    <Block style={styles.displayScores}>
                        <Text style={styles.subStatTitle}>{userStats.post_upvotes}</Text>
                        <Text color={theme.COLORS.GREY}>Post</Text>
                        <Text color={theme.COLORS.GREY}>Upvotes</Text>

                    </Block>
                    <Block style={styles.displayScores}>
                        <Text style={styles.subStatTitle}>{userStats.account_age}</Text>
                        <Text color={theme.COLORS.GREY}>Age</Text>
                    </Block>
                </Block>
                <Tab.Navigator>
                    <Tab.Screen
                        name="Posts"
                        children={() => <UserPosts uid={uid} />}
                    />
                    <Tab.Screen
                        name="Comments"
                        children={() => <UserComments uid={uid} />}
                    />
                </Tab.Navigator>
            </ScrollView>

        </Block>
    );
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
