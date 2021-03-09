import React from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {enableScreens} from 'react-native-screens';

enableScreens();
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home} from './screens/Home'
import Ionicons from "react-native-vector-icons/Ionicons";
import {HomeNavigator} from "./navigation/HomeNavigator";
import {UserProfileNavigator} from "./navigation/UserProfileNavigator";
import {ExploreNavigator} from "./navigation/ExploreNavigator";
import {SubredditNavigator} from "./navigation/SubredditNavigator";

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor="#61dafb"
                barStyle="dark-content"
            />
            <NavigationContainer>
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
                    <Tab.Screen name="Subreddit" component={SubredditNavigator}/>
                </Tab.Navigator>
            </NavigationContainer>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
