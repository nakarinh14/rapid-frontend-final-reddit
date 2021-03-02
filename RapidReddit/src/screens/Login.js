import React, {useState} from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import {Block, Button, Input, Text} from "galio-framework";
import {StyleSheet, TextInput, TouchableOpacity} from "react-native";

export const Login = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const _loginUser = async () => {
        try {
            const response = await firebase.auth().signInWithEmailAndPassword(email,password)
        }
        catch (error) {
            setErrorMessage(error.message)
        }
    }

    return (
        <Block>
            <Input
                placeholder="email"
                onChangeText={text => setEmail(text)}
            />
            <Input
                placeholder="password"
                onChangeText={text => setPassword(text)}
            />
            <Button>Login</Button>
            <Block>
                <Text>Don't have an account?</Text>
                <TouchableOpacity>
                    <Text>Sign up</Text>
                </TouchableOpacity>
            </Block>
        </Block>
    )
}
