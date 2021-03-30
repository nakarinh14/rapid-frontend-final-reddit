import React, {useState} from 'react';
import {Block, Button, Icon, NavBar, Text} from "galio-framework";
import {
    TouchableOpacity,
    Alert,
    Platform,
    StyleSheet,
    KeyboardAvoidingView,
    View,
    ActivityIndicator
} from "react-native";
import {Input} from "react-native-elements";
import {firebase} from "../firebase";
import "firebase/auth";
import theme from "../theme";

export const Login = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    if(isLoading){
        return(
            <View style={styles.preloader}>
                <ActivityIndicator size="large" color="#9E9E9E"/>
            </View>
        )
    }

    const loginUser = async () => {
        setIsLoading(true)
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
            navigation.popToTop()
            navigation.goBack()

        } catch (error) {
            Alert.alert(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Block safe flex style={{backgroundColor: theme.COLORS.WHITE}}>
            <NavBar
                titleStyle={{fontSize: 19, fontWeight: 'bold'}}
                title="Sign In"
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
                style={Platform.OS === 'android' ? {marginTop: theme.SIZES.BASE} : null}
            />
            <KeyboardAvoidingView
                style={styles.container}
                enabled
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
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
                    onPress={loginUser}
                >
                    Sign In
                </Button>
                <Text
                    style={styles.loginText}
                    shadowless
                    onPress={() => navigation.push('Register')}>
                    Don't have an account? Register now
                </Text>
            </KeyboardAvoidingView>
        </Block>
    )
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
    inputTextStyle: {
        fontSize: 16,
        marginLeft: 10
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
    },
    loginText: {
        color: '#1976D2',
        marginTop: 25,
        textAlign: 'center',
        fontSize: 13
    },
});
