import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from "../screens/Login";
import {RegisterScreen} from "../screens/RegisterScreen";

const Stack = createStackNavigator()

export default () => {
    return(
        <Stack.Navigator initialRouteName={"LoginScreen"}>
            <Stack.Screen name={"LoginScreen"} component={Login}/>
            <Stack.Screen name={"RegisterScreen"} component={RegisterScreen}/>
        </Stack.Navigator>
    )
}
