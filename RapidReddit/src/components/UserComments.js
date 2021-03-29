import React, {useContext, useState} from 'react';
import {Block, Text} from "galio-framework";
import { Pressable, StyleSheet, TouchableOpacity} from "react-native";
import theme from "../theme";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {withInteractionsManaged} from "./withInteractionsManaged";
import { getDisplayDate } from '../utils/post-date'
import ProfileContext from "../contexts/ProfileContext";


const UserComments = ({navigation}) => {

    const {userComments} = useContext(ProfileContext)
    const [show, setShow] = useState(false);

    // It's a known issue that all tab are set to highest height tab, causing weird looking UI. Hide them when out of focus.
    // Not ideal :(

    // Render looks weird with spaces on height
    // Does it still looks weird? - kenny

    return (
        <Block flex space="between" style={styles.cards}>
            {userComments && Object.keys(userComments).map((post_id, idx) => {
                const card = userComments[post_id]
                return (
                    <TouchableOpacity
                        key={`card-${idx}`}
                        onPress={() => navigation.push('Post', {postId: card.post_id})}
                    >
                        <Block
                            flex
                            style={styles.card}
                        >
                            <Block
                                shadow
                                style={styles.box}
                            >
                                <Text style={styles.titleText}>
                                    {card.post_title}
                                </Text>
                                <Text card style={styles.caption}>
                                    <Pressable
                                        style={{ padding: 0}}
                                        onPress={() => navigation.push("Subreddit", {subreaditName: card.post_subreadit})}
                                        hitSlop={20}
                                    >
                                        <Text style={styles.captionText}>
                                            {card.post_subreadit}
                                        </Text>
                                    </Pressable>
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
                    </TouchableOpacity>
                )}
            )}
        </Block>
    )
}

const styles = StyleSheet.create({
    titleText: {
        fontWeight: '500',
        fontSize: 14.6,
        marginTop: theme.SIZES.BASE * 0.905,
        color: theme.COLORS.BLACK
    },
    captionText:{
        color: theme.COLORS.GREY,
        fontWeight: '500'
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
        paddingLeft: 12,
        paddingRight: 12,
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

export default withInteractionsManaged(UserComments)
