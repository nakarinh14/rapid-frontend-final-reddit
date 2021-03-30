import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Block, NavBar, Text} from "galio-framework";
import {Platform, ScrollView, StyleSheet, View} from "react-native";
import theme from "../theme";
import {NotificationPreview} from "../components/NotificationPreview";
import {clearNotificationCounter, getNotificationRef} from "../services/NotificationService";
import AuthenticationContext from "../contexts/AuthenticationContext";
import { useFocusEffect } from '@react-navigation/native';

export const NotificationScreen = ({navigation}) => {

    const { user } = useContext(AuthenticationContext)
    const [notifications, setNotifications] = useState({})

    useEffect(() => {
        if(user) {
            const ref = getNotificationRef(user.displayName).child('objects')
            ref.on('value', (snapshot) => {
                if(snapshot.exists()){
                    let data = snapshot.val()
                    data = Object.keys(data)
                        .sort((a,b) => {
                            if(data[a].timestamp > data[b].timestamp) return -1
                            else if(data[a].timestamp < data[b].timestamp) return 1
                            return 0
                        })
                        .reduce((obj, key) => {
                            obj[key] = data[key];
                            return obj;
                        }, {});
                    setNotifications(data)
                }
            })
            return () => ref.off()
        } else {
            setNotifications({})
        }
    }, [user])

    // When screen on focus, clear notification counter.
    useFocusEffect(
        useCallback(() => {
            if(user){
                clearNotificationCounter(user.displayName)
            }
        }, [user])
    );

    return (
        <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
            <NavBar
                titleStyle={{fontSize: 19, fontWeight: 'bold'}}
                title="Notification"
                style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null}
            />
            <ScrollView>
                <View style={styles.container}>
                    {notifications
                        ? Object.keys(notifications).map((val, idx) =>
                            <NotificationPreview
                                navigation={navigation}
                                key={idx}
                                id={val}
                                notification={notifications[val]}
                            />)
                        :   <Block flex center style={styles.container}>
                                <Block style={{marginTop: 20}}>
                                    <Text style={{color: theme.COLORS.GREY}}>
                                        No new notifications. {String.fromCodePoint('0x1F515')}
                                    </Text>
                                </Block>
                            </Block>
                    }
                </View>
            </ScrollView>
        </Block>
    )
}
const styles = StyleSheet.create({
    line: {
        borderBottomColor: theme.COLORS.LINE,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 10
    },

    container: {
        // backgroundColor: 'lightgrey'
    }
})
