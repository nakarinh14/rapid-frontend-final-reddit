import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Explore } from "../screens/Explore"

export const ExploreNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
            initialRouteName="Explore"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="Explore" component={Explore}></Stack.Screen>
        </Stack.Navigator>
    )
}
