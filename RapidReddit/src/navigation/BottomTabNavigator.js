import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import {HomeNavigator} from "./HomeNavigator";
import {ExploreNavigator} from "./ExploreNavigator";
import {UserProfileNavigator} from "./UserProfileNavigator";
import {Home} from "../screens/Home";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {

    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'ios-newspaper'
                            : 'ios-newspaper-outline';
                    } else if (route.name === 'User') {
                        iconName = focused ? 'ios-man-sharp' : 'ios-man-outline';
                    } else if (route.name === 'Setting') {
                        iconName = focused ? 'ios-settings-sharp' : 'ios-settings-outline';
                    } else if (route.name === 'Explore') {
                        iconName = focused ? 'ios-rocket-sharp' : 'ios-rocket-outline';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color}/>;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name="Home" component={HomeNavigator}/>
            <Tab.Screen name="Explore" component={ExploreNavigator}/>
            <Tab.Screen name="User" component={UserProfileNavigator}/>
            <Tab.Screen name="Setting" component={Home}/>
        </Tab.Navigator>
    )
}
