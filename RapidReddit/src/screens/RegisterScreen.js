import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
// import firebase from '../database/firebase'; Firebase is not set up yet


//Testing with this script
export const Signup = ({ navigation }) => {

    const [state, useState] = useState({
        displayName: '',
        email: '',
        password: '',
        isLoading: false
    })

    const updateInputVal = (val, prop) => {
        const state = {...state};
        state[prop] = val;
        setState(state);
    }

    const registerUser = () => {
        if(state.email === '' && state.password === '') {
            Alert.alert('Enter details to signup!')
        } else {
            setState({
                isLoading: true,
            })
            firebase
                .auth()
                .createUserWithEmailAndPassword(state.email, state.password)
                .then((res) => {
                    res.user.updateProfile({
                        displayName: state.displayName
                    })
                    console.log('User registered successfully!')
                    setState({
                        isLoading: false,
                        displayName: '',
                        email: '',
                        password: ''
                    })
                    navigation.navigate('Login')
                })
                .catch(error => setState({ errorMessage: error.message }))
        }
    }

    if(state.isLoading){
        return(
            <View style={styles.preloader}>
                <ActivityIndicator size="large" color="#9E9E9E"/>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.inputStyle}
                placeholder="Name"
                value={state.displayName}
                onChangeText={(val) => updateInputVal(val, 'displayName')}
            />
            <TextInput
                style={styles.inputStyle}
                placeholder="Email"
                value={state.email}
                onChangeText={(val) => updateInputVal(val, 'email')}
            />
            <TextInput
                style={styles.inputStyle}
                placeholder="Password"
                value={state.password}
                onChangeText={(val) => updateInputVal(val, 'password')}
                maxLength={15}
                secureTextEntry={true}
            />
            <Button
                color="#3740FE"
                title="Signup"
                onPress={() => registerUser()}
            />

            <Text
                style={styles.loginText}
                onPress={() => navigation.navigate('Login')}>
                Already Registered? Click here to login
            </Text>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 35,
        backgroundColor: '#fff'
    },
    inputStyle: {
        width: '100%',
        marginBottom: 15,
        paddingBottom: 15,
        alignSelf: "center",
        borderColor: "#ccc",
        borderBottomWidth: 1
    },
    loginText: {
        color: '#3740FE',
        marginTop: 25,
        textAlign: 'center'
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    }
});
