import {Block, NavBar,Button, Text} from "galio-framework";
import theme from "../theme";
import {Platform, StyleSheet, View} from "react-native";
import React from "react";

export const UnauthenticatedScreen = ({navigation}) => {
    return (
        <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
            <NavBar
                titleStyle={{fontSize: 19, fontWeight: 'bold'}}
                title="Not Authorized"
                style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null}
            />
            <View style={styles.container}>
                <Text size={20}>
                    You are not signed in.
                </Text>
                <Button
                    color="#1976D2"
                    shadowless
                    size={'small'}
                    style={{marginTop: 30}}
                    onPress={() => navigation.push("Login")}
                >
                    Sign In
                </Button>
            </View>

        </Block>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff'
    }
})
