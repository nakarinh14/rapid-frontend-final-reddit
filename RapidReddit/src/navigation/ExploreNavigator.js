import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Explore } from "../screens/Explore"
import { Subreddit } from "../screens/Subreddit"
<<<<<<< HEAD
import {EditSubreddit} from "../screens/EditSubreddit"
=======
import Post from "../screens/Post";
import {UserProfile} from "../screens/UserProfile";
>>>>>>> 307f41928f1c057d9afe6b84b9d7712519eed3b6

export const ExploreNavigator = () => {
    const Stack = createStackNavigator();
    return (
<<<<<<< HEAD
        <Stack.Navigator
            initialRouteName="Explore"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="Explore" component={Explore}></Stack.Screen>
            <Stack.Screen name="Subreddit" component={Subreddit}></Stack.Screen>
            <Stack.Screen name="EditSubreddit" component={EditSubreddit}></Stack.Screen>
=======
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Explore" component={Explore}/>
            <Stack.Screen name="Subreddit" component={Subreddit}/>
            <Stack.Screen name="Post" component={Post} />
            <Stack.Screen
                name="User"
                component={UserProfile}
                initialParams={{ owner: false }}
            />
>>>>>>> 307f41928f1c057d9afe6b84b9d7712519eed3b6
        </Stack.Navigator>
    )
}
