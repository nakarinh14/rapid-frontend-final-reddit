import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Explore } from "../screens/Explore"
import { Subreddit } from "../screens/Subreddit"
import {EditSubreddit} from "../screens/EditSubreddit"

export const ExploreNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
            initialRouteName="Explore"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="Explore" component={Explore}></Stack.Screen>
            <Stack.Screen name="Subreddit" component={Subreddit}></Stack.Screen>
            <Stack.Screen name="EditSubreddit" component={EditSubreddit}></Stack.Screen>
        </Stack.Navigator>
    )
}
