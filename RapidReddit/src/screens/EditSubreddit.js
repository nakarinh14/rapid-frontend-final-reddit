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

export const EditSubreddit = ({ route, navigation}) => {


    useEffect(() => {

        const subredditRef = SubredditService.getRefForSubreddit(subredditId)

        subredditRef.on('value', snapshot => {
            data = snapshot.val();
            setSubreddit(data)
            window.console.log("data: ")
            window.console.log(data)
        })

        return function cleanup() {
            subredditRef.off('value')
        }


    },[])

    return (
        <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
            <NavBar

                title={subreddit.name}

                left={
                    (<TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon
                            name="arrow-left"
                            family="feather"
                            size={24}
                            color={theme.COLORS.ICON}
                        />
                    </TouchableOpacity>)
                }
                right = {!owner ? 
                (<TouchableOpacity onPress={() => navigation.navigate("EditSubreddit")}>
                        <Ionicons name="pencil-outline" size={22} color={theme.COLORS.BLOCK}/>
                    </TouchableOpacity>) : null
                }
                style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null}

            />
            <ScrollView>
    
            </ScrollView>

        </Block>
    );
}

const styles = StyleSheet.create({
    
});
