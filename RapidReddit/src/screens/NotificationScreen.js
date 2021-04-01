import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Block, NavBar, Text} from "galio-framework";
import {Platform, ScrollView, StyleSheet, View, TouchableOpacity} from "react-native";
import theme from "../theme";
import {NotificationPreview} from "../components/NotificationPreview";
import {clearNotificationCounter, getNotificationRef, removeNotification} from "../services/NotificationService";
import AuthenticationContext from "../contexts/AuthenticationContext";
import { useFocusEffect } from '@react-navigation/native';
import {SwipeListView} from "react-native-swipe-list-view";
import {Icon} from "react-native-elements";

export const NotificationScreen = ({navigation}) => {

    const { user } = useContext(AuthenticationContext)
    const [notifications, setNotifications] = useState([])

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
                        .map((val) => {
                            const obj = {...data[val]}
                            obj.id = val
                            obj.key = val
                            return obj
                        })
                    setNotifications(data)
                } else {
                    setNotifications([])
                }
            })
            return () => ref.off()
        } else {
            setNotifications([])
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
                    {notifications.length > 0 ?
                        <NotificationSwipeList
                            notifications={notifications}
                            navigation={navigation}
                            user={user}
                        /> :
                        <Block flex center style={styles.container}>
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
const NotificationSwipeList = ({notifications, navigation, user}) => {

    return (
        <SwipeListView
            disableRightSwipe
            scrollEnabled={false}
            initialRightActionState={true}
            data={notifications}
            renderItem={ (data) => (
                <NotificationPreview
                    navigation={navigation}
                    id={data.item.id}
                    notification={data.item}
                />
            )}
            renderHiddenItem={ (data) => (
                <TouchableOpacity
                    style={styles.hiddenContainer}
                    onPress={() => removeNotification(user.displayName, data.item.id)}>
                    <View style={styles.hiddenContainer}>
                        <Icon
                            name={'trash'}
                            type={'feather'}
                            color='white'
                            size={32}
                        />
                    </View>
                </TouchableOpacity>
            )}
            leftOpenValue={75}
            rightOpenValue={-75}
        />
    )
}


const styles = StyleSheet.create({
    line: {
        borderBottomColor: theme.COLORS.LINE,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 10
    },
    hiddenContainer: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#f44336',
        paddingRight: 10
    },
    container: {
        // backgroundColor: 'lightgrey'
    }
})
