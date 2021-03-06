import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {Home} from "../screens/Home";
import {UserProfile} from "../screens/UserProfile";
import {Post} from "../screens/Post";

export const HomeNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Post" component={Post} />
            <Stack.Screen
                name="User"
                component={UserProfile}
                initialParams={{ owner: false }}
            />
        </Stack.Navigator>
    )
}
