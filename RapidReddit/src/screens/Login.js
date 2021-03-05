import React, {useState} from 'react';
import {Block, Button, Input, Text} from "galio-framework";
import {StyleSheet, TextInput, TouchableOpacity, Alert} from "react-native";
import {firebase} from "../firebase";
import "firebase/auth";

export const Login = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginUser = async () => {
        try {
            const response = await firebase.auth().signInWithEmailAndPassword(email, password)
            // if (response) {
            //     navigation.navigate('Home')
            // }
        }
        catch (error) {
            Alert.alert(error.message)
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
            <Button title="Login" onPress={() => loginUser()}/>
            <Block>
                <Text>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                    <Text bold>SIGN UP</Text>
                </TouchableOpacity>
            </Block>
        </Block>
    )
}
