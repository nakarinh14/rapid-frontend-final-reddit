import React, {useContext} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {UserProfile} from "../screens/UserProfile";
import Post from "../screens/Post";
import {Subreddit} from "../screens/Subreddit";
import {NotificationScreen} from "../screens/NotificationScreen";
import AuthenticationContext from "../contexts/AuthenticationContext";
import {UnauthenticatedScreen} from "../screens/UnauthenticatedScreen";

const Stack = createStackNavigator();

export const NotificationNavigator = ({navigation}) => {

    const { user } = useContext(AuthenticationContext)
    if(!user) {
        return <UnauthenticatedScreen navigation={navigation} />
    }

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Notification" component={NotificationScreen} />
            <Stack.Screen name="Post" component={Post} />
            <Stack.Screen
                name="User"
                component={UserProfile}
                initialParams={{ owner: false }}
            />
            <Stack.Screen name="Subreddit" component={Subreddit}/>
        </Stack.Navigator>
    )
}
