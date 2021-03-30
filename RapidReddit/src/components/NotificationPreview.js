import React, {useContext} from 'react';
import { StyleSheet } from 'react-native';
import { Text} from 'galio-framework';
import theme from '../theme';
import AuthenticationContext from "../contexts/AuthenticationContext";
import { ListItem, Icon } from 'react-native-elements'
import { getDisplayDate } from "../utils/post-date";
import {readNotification} from "../services/NotificationService";

export const NotificationPreview = ({navigation, id, notification}) => {

    const { user } = useContext(AuthenticationContext)

    const onPressNotify = () => {
        navigation.push("Post", {postId: notification.post_id})
        readNotification(user.displayName, id)
    }

    return (
        <ListItem
            onPress={() => onPressNotify()}
            containerStyle={notification.read ? null : {backgroundColor: '#f0faff'}}
        >
            {getIcon(notification.type)}
            <ListItem.Content>
                <ListItem.Title>
                    {getNotificationText(notification)}
                </ListItem.Title>
                <ListItem.Subtitle style={styles.notificationCaption}>
                    {getDisplayDate(notification.timestamp)} ago
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

const getNotificationText = (notification) => {
    switch (notification.type) {
        case 'reply':
            return (
                <Text style={styles.notificationTitleText}>
                    <Text style={styles.notificationBoldText}>
                        {notification.name}
                    </Text> reply to one of your {notification.convo_type} on
                    <Text style={styles.subreadit}> {notification.subreadit}</Text>.
                </Text>
            )
        case 'karma_like':
            return (
                <Text style={styles.notificationTitleText}>
                    <Text style={styles.notificationBoldText}>
                        {notification.name}
                    </Text> upvote one of your {notification.convo_type} on
                    <Text style={styles.subreadit}> {notification.subreadit}</Text>.
                </Text>
            )
        case 'karma_dislike':
            return (
                <Text style={styles.notificationTitleText}>
                    <Text style={styles.notificationBoldText}>
                        {notification.name}
                    </Text> downvote one of your {notification.convo_type} on
                    <Text style={styles.subreadit}> {notification.subreadit}</Text>.
                </Text>
            )
    }
}

const getIcon = (notificationType) => {
    const iconMap = {
        reply: {name: 'reply', type: 'material-community'},
        karma_like: {name: 'thumbs-up', type: 'feather'},
        karma_dislike: {name: 'thumbs-down', type: 'feather'},
    }
    const iconAttrs = iconMap[notificationType]
    return (<Icon name={iconAttrs.name} type={iconAttrs.type} color={theme.COLORS.BLOCK} />)
}

const styles = StyleSheet.create({
    card: {
        padding: 10,
        backgroundColor: theme.COLORS.WHITE

    },
    cardContent: {
        padding: theme.SIZES.BASE * 0.3,
        flexDirection: "column"
    },
    cardIcon: {
        padding: theme.SIZES.BASE * 0.5 ,
    },
    bottomActions: {
        justifyContent: "space-between",
    },
    title:{
        marginBottom: 8
    },
    titleText:{
        fontSize: 17
    },
    contentText: {
        color: theme.COLORS.BLOCK
    },
    groupText: {
        fontWeight: '500',
    },
    notificationTitleText: {
        fontSize: 15
    },
    notificationBoldText: {
        fontWeight: '700'
    },
    notificationCaption: {
        color: theme.COLORS.GREY
    },
    subreadit: {
        color: 'tomato',
        fontWeight: '700',
    }

})


