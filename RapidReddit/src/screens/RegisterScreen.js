import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import { firebase } from "../firebase";
import AuthenticationContext from "../contexts/AuthenticationContext";
import 'firebase/auth'

export const RegisterScreen = ({ navigation }) => {

    const [displayName, setDisplayName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const authentication = useContext(AuthenticationContext)

    const registerUser = async () => {
        if(email === '' && password === '') {
            Alert.alert('Enter details to signup!')
        } else {
            try{
                setIsLoading(true)
                const user = await firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)

                await user.user.updateProfile({
                    displayName: displayName
                })


                console.log('User registered successfully!')
                authentication.loginUser(user)
                // navigation.navigate('Login')
            } catch (error) {
                setErrorMessage(error.message)
            } finally {
                setIsLoading(false)
            }
        }
    }

    if(isLoading){
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
                value={displayName}
                onChangeText={(val) => setDisplayName(val)}
            />
            <TextInput
                style={styles.inputStyle}
                placeholder="Email"
                value={email}
                onChangeText={(val) => setEmail(val)}
            />
            <TextInput
                style={styles.inputStyle}
                placeholder="Password"
                value={password}
                onChangeText={(val) => setPassword(val)}
                maxLength={15}
                secureTextEntry={true}
            />
            <Button
                color="#3740FE"
                title="Signup"
                onPress={registerUser}
            />
            <Text>
                {errorMessage}
            </Text>
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
