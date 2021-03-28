import React, {useContext, useEffect, useState} from 'react';
import {Block, Text} from "galio-framework";
import {ActivityIndicator, Dimensions, StyleSheet} from "react-native";
import theme from "../theme";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {withInteractionsManaged} from "./withInteractionsManaged";
import { getCommentsForUser } from "../services/CommentsService";
import AuthenticationContext from "../contexts/AuthenticationContext";
import { getDisplayDate } from '../utils/post-date'


const UserComments = () => {

    const [userComments, setUserComments] = useState({})
    const {user} = useContext(AuthenticationContext)
    const fetchComment = async () => {
        try {
            const res = await getCommentsForUser(user.displayName).get()
            setUserComments(res)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchComment()
    }, [])
    console.log(userComments)
    // Render looks weird with spaces on height
    return (
        <Block flex space="between" style={styles.cards}>
            {userComments && Object.keys(userComments).map((post_id) => {
                const card = userComments[post_id]
                console.log(getDisplayDate(card.timestamp))
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
                                Temporary
                                {/*{card.title}*/}
                            </Text>
                            <Text card style={styles.caption}>
                                <Text style={styles.captionText}>
                                    Placeholder
                                    {/*{card.group}*/}
                                </Text>
                                <MaterialCommunityIcons name="circle-medium" color="grey"/>
                                <Text style={styles.timestampText}>
                                    {getDisplayDate(card.timestamp)}
                                </Text>
                                <MaterialCommunityIcons name="circle-medium" color="grey"/>
                                <Text style={styles.timestampText}>
                                    {card.upvotes}
                                </Text>
                                <MaterialCommunityIcons name="arrow-up-bold-outline" color="grey"/>

                            </Text>
                            <Text style={styles.commentText}>
                                {card.body}
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
    },
    box:{
        padding: 12,
    },
    card: {
        backgroundColor: theme.COLORS.WHITE,
        marginVertical: theme.SIZES.BASE * 0.19,
        elevation: theme.SIZES.BASE / 2,
        flex: 1,
        alignContent: 'stretch',
        justifyContent: 'center',
    },
    scene: {
        flex: 1,
    },
});

export default withInteractionsManaged(UserComments, ActivityIndicator)
