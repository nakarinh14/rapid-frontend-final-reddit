import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Explore } from "../screens/Explore"
import { Subreddit } from "../screens/Subreddit"
import Post from "../screens/Post";
import {UserProfile} from "../screens/UserProfile";

export const ExploreNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Explore" component={Explore}/>
            <Stack.Screen name="Subreddit" component={Subreddit}/>
            <Stack.Screen name="Post" component={Post} />
            <Stack.Screen
                name="User"
                component={UserProfile}
                initialParams={{ owner: false }}
            />
        </Stack.Navigator>
    )
}
