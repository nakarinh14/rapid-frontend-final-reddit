import React, {useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {Home} from "../screens/Home";
import {UserProfile} from "../screens/UserProfile";
import {Login} from '../screens/Login'
import {RegisterScreen} from "../screens/RegisterScreen";
import Post from "../screens/Post";
import AuthenticationContext from "../contexts/AuthenticationContext";

const Stack = createStackNavigator();

export const HomeNavigator = () => {

    const [ loggedInUser, setLoggedInUser ] = useState(null)

    const authentication = {
        user: loggedInUser,
        isLoggedIn: () => loggedInUser !== null,
        loginUser: (user) => setLoggedInUser(user),
        logoutUser: () => setLoggedInUser(null)
    }

    return (
        <AuthenticationContext.Provider value={authentication}>
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
                <Stack.Screen name={"Login"} component={Login}/>
                <Stack.Screen name={"Register"} component={RegisterScreen}/>
            </Stack.Navigator>
        </AuthenticationContext.Provider>
    )
}
