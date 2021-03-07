import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {Subreddit} from "../screens/Subreddit";
import Post from "../screens/Post";

const Stack = createStackNavigator();

export const SubredditNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Subreddit"
        >
            <Stack.Screen
                name="Subreddit"
                component={Subreddit}
            />
            <Stack.Screen name="Post" component={Post} />
        </Stack.Navigator>
    )
}

