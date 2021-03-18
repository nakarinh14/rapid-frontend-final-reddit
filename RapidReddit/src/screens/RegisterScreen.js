import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Alert,
    ActivityIndicator,
    TouchableOpacity,
    Platform
    , KeyboardAvoidingView
} from 'react-native';
import { Input } from 'react-native-elements';
import {Block, Button, Icon, NavBar} from "galio-framework";
import theme from "../theme";
import {registerNewUser} from "../services/AuthService";

export const RegisterScreen = ({ navigation }) => {

    const [displayName, setDisplayName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const registerUser = async () => {
        if(email === '' && password === '') {
            Alert.alert('Enter details to signup!')
        } else {
            try{
                setIsLoading(true)
                await registerNewUser(email, password, displayName)
                console.log('User registered successfully!')
                navigation.popToTop()
                navigation.goBack()
            } catch (error) {
                Alert.alert(error.message)
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
        <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
            <NavBar
                titleStyle={{fontSize: 19, fontWeight: 'bold'}}
                title="Register"
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
            <KeyboardAvoidingView
                style={styles.container}
                enabled
                behavior={ Platform.OS === 'ios'? 'padding': 'height'}
            >
                <Input
                    label="Display Name"
                    placeholder='Enter Display Name'
                    returnKeyType="next"
                    inputStyle={styles.inputTextStyle}
                    value={displayName}
                    leftIcon={
                        <Icon
                            name="person"
                            family="ionicons"
                            size={16}
                            color='grey'
                        />
                    }
                    onChangeText={(val) => setDisplayName(val)}
                    autoCapitalize='none'
                />
                <Input
                    label="Email"
                    placeholder='yours@example.com'
                    textContentType='emailAddress'
                    keyboardType="email-address"
                    autoCompleteType="email"
                    returnKeyType="next"
                    inputStyle={styles.inputTextStyle}
                    value={email}
                    leftIcon={
                        <Icon
                            name='mail'
                            family="ionicons"
                            size={16}
                            color='grey'
                        />
                    }
                    onChangeText={(val) => setEmail(val)}
                    autoCapitalize='none'
                />
                <Input
                    label="Password"
                    placeholder='Enter password'
                    textContentType='newPassword'
                    returnKeyType="done"
                    value={password}
                    inputStyle={styles.inputTextStyle}
                    autoCorrect={false}
                    leftIcon={
                        <Icon
                            name='lock'
                            family="ionicons"
                            size={16}
                            color='grey'
                        />
                    }
                    onChangeText={(val) => setPassword(val)}
                    secureTextEntry={true}
                    autoCapitalize='none'
                />
                <Button
                    mode='contained'
                    color="#1976D2"
                    shadowless
                    onPress={registerUser}
                >
                    Sign Up
                </Button>
            </KeyboardAvoidingView>
        </Block>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff'
    },
    errorMessageText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
    },
    inputTextStyle:{
        fontSize: 16,
        marginLeft: 10
    },
    loginText: {
        color: '#1976D2',
        marginTop: 25,
        textAlign: 'center',
        fontSize: 13
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
