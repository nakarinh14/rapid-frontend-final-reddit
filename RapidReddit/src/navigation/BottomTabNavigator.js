import React, {useContext, useEffect, useState} from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import {HomeNavigator} from "./HomeNavigator";
import {ExploreNavigator} from "./ExploreNavigator";
import {UserProfileNavigator} from "./UserProfileNavigator";
import {NotificationNavigator} from "./NotificationNavigator";
import {Home} from "../screens/Home";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {withBadge, Icon} from "react-native-elements";
import {getNotificationRef} from "../services/NotificationService";
import AuthenticationContext from "../contexts/AuthenticationContext";

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {

    const { user } = useContext(AuthenticationContext)
    const [notificationCounter, setNotificationCounter] = useState(0)

    useEffect(() => {
        if(user) {
            const ref = getNotificationRef(user.displayName).child('counter')
            ref.on('value', (snapshot) => {
                if(snapshot.exists()){
                    setNotificationCounter(snapshot.val())
                }
            })
            return () => ref.off()
        } else {
            setNotificationCounter(0)
        }
    }, [user])

    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'ios-newspaper' : 'ios-newspaper-outline';
                    } else if (route.name === 'User') {
                        iconName = focused ? 'ios-man-sharp' : 'ios-man-outline';
                    } else if (route.name === 'Notification') {
                        iconName = focused ? 'ios-notifications-sharp' : 'ios-notifications-outline';
                        if (notificationCounter > 0){
                            const BadgedIcon = withBadge(notificationCounter)(Icon)
                            return <BadgedIcon type="ionicon" size={size} color={color} name={iconName} />
                        }
                    } else if (route.name === 'Explore') {
                        iconName = focused ? 'ios-rocket-sharp' : 'ios-rocket-outline';
                    }
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
            <Tab.Screen name="Notification" component={NotificationNavigator}/>
        </Tab.Navigator>
    )
}
