import React from 'react';

import {Block, Text} from "galio-framework";
import {Dimensions, StyleSheet} from "react-native";
import theme from "../theme";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('screen');

export const UserComments = () => {
    const comments = [
        {
            title: "[PURCHASE guide] 2020, ASK ANYTHING!",
            group: "DIY",
            upvotes: 10,
            timestamp: "2hr",
            comment: "Try to go to other grocery stores and sees their prices by yourself."
        },
        {
            title: "YOLO",
            group: "Investment",
            upvotes: 10,
            timestamp: "5d",
            comment: "YOLOed some crazy stonks."
        },
        {
            title: "[PURCHASE guide] 2020, ASK ANYTHING!",
            group: "DIY",
            upvotes: 10,
            timestamp: "5min",
            comment: "Try to go to other grocery stores and sees their prices by yourself."
        },
        {
            title: "[PURCHASE guide] 2020, ASK ANYTHING!",
            group: "DIY",
            upvotes: 10,
            timestamp: "5yr",
            comment: "Try to go to other grocery stores and sees their prices by yourself."
        },
        {
            title: "[PURCHASE guide] 2020, ASK ANYTHING!",
            group: "DIY",
            upvotes: 10,
            timestamp: "2hr",
            comment: "Try to go to other grocery stores and sees their prices by yourself."
        },
        {
            title: "[PURCHASE guide] 2020, ASK ANYTHING!",
            group: "DIY",
            upvotes: 10,
            timestamp: "2hr",
            comment: "Try to go to other grocery stores and sees their prices by yourself."
        },
    ];

    return (
        <Block flex space="between" style={styles.cards}>
            {comments && comments.map((card, id) => (
                <Block
                    key={`card-${id}`}
                    flex
                    style={styles.card}
                >
                    <Block
                        shadow
                        style={styles.box}
                    >
                        <Text style={styles.titleText}>
                            {card.title}
                        </Text>
                        <Text card style={styles.caption}>
                            <Text style={styles.captionText}>
                                {card.group}
                            </Text>
                            <MaterialCommunityIcons name="circle-medium" color="grey" />
                            <Text style={styles.timestampText}>
                                {card.timestamp}
                            </Text>
                            <MaterialCommunityIcons name="circle-medium" color="grey" />
                            <Text style={styles.timestampText}>
                                {card.upvotes}
                            </Text>
                            <MaterialCommunityIcons name="arrow-up-bold-outline"  color="grey" />

                        </Text>
                        <Text style={styles.commentText}>
                            {card.comment}
                        </Text>
                    </Block>
                </Block>
            ))}
        </Block>
    )
}
const styles = StyleSheet.create({
    titleText: {
        fontWeight: '600',
        marginTop: theme.SIZES.BASE * 0.905,
        color: theme.COLORS.BLACK
    },
    captionText:{
        color: theme.COLORS.GREY
    },
    commentText: {
        marginBottom: theme.SIZES.BASE * 0.905,
        color: theme.COLORS.BLACK
    },
    timestampText: {
        color: theme.COLORS.GREY
    },
    caption: {
        marginTop: theme.SIZES.BASE * 0.175,
        marginBottom: theme.SIZES.BASE * 0.235,
        justifyContent: 'space-between'
    },
    cards: {
        backgroundColor: theme.COLORS.PAPER,
        alignItems: 'center',
        justifyContent: 'center',
    },
    box:{
        width: width - theme.SIZES.BASE * 2,
    },
    card: {
        backgroundColor: theme.COLORS.WHITE,
        width,
        marginVertical: theme.SIZES.BASE * 0.29,
        elevation: theme.SIZES.BASE / 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scene: {
        flex: 1,
    },
});
