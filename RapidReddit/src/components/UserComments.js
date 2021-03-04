import React, { useEffect, useState } from 'react';
import {Block, Text} from "galio-framework";
import {Dimensions, StyleSheet} from "react-native";
import theme from "../theme";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {firebase} from "../firebase";

const { width } = Dimensions.get('screen');

const comments = {
    "1":{
        title: "[PURCHASE guide] 2020, ASK ANYTHING!",
        group: "DIY",
        upvotes: 10,
        timestamp: "2hr",
        comment: "Try to go to other grocery stores and sees their prices by yourself."
    },
    "2":{
        title: "YOLO",
        group: "Investment",
        upvotes: 10,
        timestamp: "5d",
        comment: "YOLOed some crazy stonks."
    },
    "3":{
        title: "[PURCHASE guide] 2020, ASK ANYTHING!",
        group: "DIY",
        upvotes: 10,
        timestamp: "5min",
        comment: "Try to go to other grocery stores and sees their prices by yourself."
    },
    "4":{
        title: "[PURCHASE guide] 2020, ASK ANYTHING!",
        group: "DIY",
        upvotes: 10,
        timestamp: "5yr",
        comment: "Try to go to other grocery stores and sees their prices by yourself."
    },
    "5":{
        title: "[PURCHASE guide] 2020, ASK ANYTHING!",
        group: "DIY",
        upvotes: 10,
        timestamp: "2hr",
        comment: "Try to go to other grocery stores and sees their prices by yourself."
    },
    "6":{
        title: "[PURCHASE guide] 2020, ASK ANYTHING!",
        group: "DIY",
        upvotes: 10,
        timestamp: "2hr",
        comment: "Try to go to other grocery stores and sees their prices by yourself."
    }
};

const useMockData = true

export const UserComments = ({ uid }) => {

    const [userComments, setUserComments] = useState(null)

    useEffect(() => {
        if(useMockData){
            setUserComments(comments)
            return
        }
        const ref = firebase.database().ref(`user_profile/${uid}/comments`)
        ref.on('value', (snapshot) => {
            if(snapshot.exists()){
                setUserComments(snapshot.val())
            }
        })
    })

    return (
        <Block flex space="between" style={styles.cards}>
            {userComments && Object.keys(userComments).map((post_id) => {
                const card = userComments[post_id]
                return (
                    <Block
                        key={`card-${post_id}`}
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
                                <MaterialCommunityIcons name="circle-medium" color="grey"/>
                                <Text style={styles.timestampText}>
                                    {card.timestamp}
                                </Text>
                                <MaterialCommunityIcons name="circle-medium" color="grey"/>
                                <Text style={styles.timestampText}>
                                    {card.upvotes}
                                </Text>
                                <MaterialCommunityIcons name="arrow-up-bold-outline" color="grey"/>

                            </Text>
                            <Text style={styles.commentText}>
                                {card.comment}
                            </Text>
                        </Block>
                    </Block>
                )}
            )}
        </Block>
    )
}

const styles = StyleSheet.create({
    titleText: {
        fontWeight: '600',
        fontSize: 14.6,
        marginTop: theme.SIZES.BASE * 0.905,
        color: theme.COLORS.BLACK
    },
    captionText:{
        color: theme.COLORS.GREY
    },
    commentText: {
        marginBottom: theme.SIZES.BASE * 0.905,
        color: theme.COLORS.BLACK,
        lineHeight: 20,
        fontSize: 14.6
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
        marginVertical: theme.SIZES.BASE * 0.19,
        elevation: theme.SIZES.BASE / 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scene: {
        flex: 1,
    },
});
