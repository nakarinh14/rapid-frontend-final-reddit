import React, {useContext} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {UserProfile} from "../screens/UserProfile";
import Post from "../screens/Post";
import {Subreddit} from "../screens/Subreddit";
import {UnauthenticatedScreen} from "../screens/UnauthenticatedScreen";
import AuthenticationContext from "../contexts/AuthenticationContext";

const Stack = createStackNavigator();

export const UserProfileNavigator = ({navigation}) => {

    const { user } = useContext(AuthenticationContext)

    if(!user) {
        return <UnauthenticatedScreen navigation={navigation}  />
    }
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
