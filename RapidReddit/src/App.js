import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {UserProfile} from './screens/UserProfile'
import {Home} from './screens/Home'
import {CommentSection} from './components/CommentSection'
import Ionicons from "react-native-vector-icons/Ionicons";

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
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'ios-newspaper'
                            : 'ios-newspaper-outline';
                    } else if (route.name === 'User') {
                        iconName = focused ? 'ios-man-sharp' : 'ios-man-outline';
                    } else if (route.name === 'Setting') {
                        iconName = focused ? 'ios-settings-sharp' : 'ios-settings-outline';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name="Home" component={CommentSection} />
            <Tab.Screen name="User" component={UserProfile} />
            <Tab.Screen name="Setting" component={Home} />
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
