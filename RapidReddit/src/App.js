import React, {useEffect, useState} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {enableScreens} from 'react-native-screens';

enableScreens();
import {NavigationContainer} from '@react-navigation/native';
import AuthenticationContext from "./contexts/AuthenticationContext";
import {firebase} from "./firebase";
import "firebase/auth";
import {Login} from "./screens/Login";
import {RegisterScreen} from "./screens/RegisterScreen";
import {createStackNavigator} from "@react-navigation/stack";
import {BottomTabNavigator} from "./navigation/BottomTabNavigator";
import { getUpvotedCommentsRef} from "./services/CommentsService";

export default function App() {

    const [loggedInUser, setLoggedInUser] = useState(null)
    const [ upvotedComments, setUpvotedComments ] = useState({})
    const [ upvotesRef, setUpvoteRef ] = useState(null)

    const authentication = {
        user: loggedInUser,
        isLoggedIn: () => loggedInUser !== null,
        upvotedComments: upvotedComments
    }
    // Have to move outside, attach/detach listener in onAuthStateChange don't work well.
    if(loggedInUser && !upvotesRef) {
        const ref = getUpvotedCommentsRef(loggedInUser.displayName)
        ref.on('value',(snapshot) => {
            setUpvotedComments(snapshot.val() || {})
        })
        setUpvoteRef(ref)
    }  else if (!loggedInUser && upvotesRef){
        // User has logged out and ref is currently attached
        // Gotta store ref in variable, cos getUpvoted func isn't referencing to same ref.
        upvotesRef.off()
        setUpvoteRef(null)
    }

    useEffect(() => {
        // unsubscribe on unmount
        return firebase.auth().onAuthStateChanged((user) => {
            setLoggedInUser(user);
        })
    }, []);

    const Stack = createStackNavigator()

    return (
        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor="#61dafb"
                barStyle="dark-content"
            />
            <AuthenticationContext.Provider value={authentication}>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{headerShown: false}}>
                        <Stack.Screen name={"MainBottom"} component={BottomTabNavigator}/>
                        <Stack.Screen name={"Login"} component={Login}/>
                        <Stack.Screen name={"Register"} component={RegisterScreen}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </AuthenticationContext.Provider>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
