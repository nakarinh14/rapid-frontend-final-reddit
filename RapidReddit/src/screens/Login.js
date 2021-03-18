import React, {useState} from 'react';
import {Block, Button, Icon, Input, NavBar, Text} from "galio-framework";
import {TouchableOpacity, Alert, Platform, ScrollView} from "react-native";
import {firebase} from "../firebase";
import "firebase/auth";
import theme from "../theme";

export const Login = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginUser = async () => {
        try {
            const response = await firebase.auth().signInWithEmailAndPassword(email, password)
            if (response) {
                navigation.popToTop()
                navigation.goBack()
            }
        }
        catch (error) {
            Alert.alert(error.message)
        }
    }

    return (
        <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
            <NavBar
                titleStyle={{fontSize: 19, fontWeight: 'bold'}}
                title="Login"
                left={(
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon
                            name="arrow-left"
                            family="feather"
                            size={24}
                            color={theme.COLORS.ICON}
                        />
                    </TouchableOpacity>
                )}
                style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null}
            />
            <ScrollView>
                <Input
                    placeholder="email"
                    onChangeText={text => setEmail(text)}
                    textContentType={"emailAddress"}
                    keyboardType={"email-address"}
                />
                <Input
                    placeholder="password"
                    onChangeText={text => setPassword(text)}
                    textContentType={"password"}
                    secureTextEntry={true}
                />
                <Button title="Login" onPress={() => loginUser()}/>
                <Block>
                    <Text>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text bold>SIGN UP</Text>
                    </TouchableOpacity>
                </Block>
            </ScrollView>
        </Block>
    )
}
