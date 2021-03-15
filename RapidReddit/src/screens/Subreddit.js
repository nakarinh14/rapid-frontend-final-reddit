import React, {useEffect, useState} from 'react';
import {StyleSheet, Platform, TouchableOpacity, ScrollView} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {Block, NavBar, Icon, Text} from 'galio-framework';
import theme from '../theme';
// Not really reuseable. Might need to create new one here.
import SubredditAbout from "../components/UserComments";
import UserPosts from "../components/UserPosts"
import {firebase} from "../firebase";
import PostListComponent from "../components/PostListComponent";
import * as SubredditService from '../services/SubredditService'


const online = 980;


const owner = true;

const Tab = createMaterialTopTabNavigator();

export const Subreddit = ({ route, navigation, uid }) => {

    const {subredditId} = route.params

    const [subreddit, setSubreddit] = useState({
            name: "",
            description: "",
            subscribers: 0,
            date_created: 0
    });

    useEffect(() => {

        const subredditRef = SubredditService.getRefForSubreddit(subredditId)

        subredditRef.on('value', snapshot => {
            data = snapshot.val();
            setSubreddit(data)
            window.console.log("data: ")
            window.console.log(data)
        })

        return function cleanup() {
            ref.off('value')
        }


    },[])

    return (
        <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
            <NavBar

                title={subreddit.name}

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
                        <Text style={styles.subStatTitle}>{subreddit.subscribers}</Text>
                        <Text color={theme.COLORS.GREY}>Members</Text>
                    </Block>
                    <Block style={styles.displayScores}>
                        <Text style={styles.subStatTitle}>{online}</Text>
                        <Text color={theme.COLORS.GREY}>Online</Text>
                    </Block>

                </Block>
                <Text style={styles.description}>
                    {subreddit.description}
                </Text>
                <Tab.Navigator>
                    <Tab.Screen
                        name="Posts"
                        component={PostListComponent} subreadit={subredditId}
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
    },
    description:{
        textAlign: 'center'
    }
});
