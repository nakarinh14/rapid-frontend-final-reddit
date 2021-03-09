import React, {useEffect, useState} from 'react';
import {StyleSheet, Platform, TouchableOpacity, ScrollView} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {Block, NavBar, Icon, Text} from 'galio-framework';
import theme from '../theme';
import SubredditAbout from "../components/UserComments";
import UserPosts from "../components/UserPosts"
import {firebase} from "../firebase";

const subreddit = {
    namePage: "testPage",
    members: 1200,
    online: 980,
    Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu lacus et nulla aliquet ullamcorper. Integer eget nulla arcu. Pellentesque sodales sit amet orci sed vehicula. "
};

const Tab = createMaterialTopTabNavigator();

const useMockData = true

export const Subreddit = ({ route, navigation, uid }) => {

    const { owner } = route.params
    const [userStats, setUserStats] = useState(subreddit)

    useEffect(() => {

        if(useMockData){
            setUserStats(subreddit)
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

                title={subreddit.namePage}

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
                    <Block style={styles.displayScores}>
                        <Text style={styles.subStatTitle}>{subreddit.members}</Text>
                        <Text color={theme.COLORS.GREY}>Members</Text>
                    </Block>
                    <Block style={styles.displayScores}>
                        <Text style={styles.subStatTitle}>{subreddit.online}</Text>
                        <Text color={theme.COLORS.GREY}>Online</Text>
                    </Block>

                </Block>
                <Text>
                    {subreddit.Description}
                </Text>
                <Tab.Navigator>
                    <Tab.Screen
                        name="Posts"
                        component={UserPosts}
                    />
                    <Tab.Screen
                        name="About"
                        component={SubredditAbout}
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
