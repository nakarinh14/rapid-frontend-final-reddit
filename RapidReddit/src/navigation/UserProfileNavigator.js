import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {UserProfile} from "../screens/UserProfile";
import Post from "../screens/Post";
import {Subreddit} from "../screens/Subreddit";

const Stack = createStackNavigator();

export const UserProfileNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="User"
                component={UserProfile}
                initialParams={{ owner: true }}
            />
            <Stack.Screen name="Post" component={Post} />
            <Stack.Screen name="Subreddit" component={Subreddit}/>
        </Stack.Navigator>
    )
}
