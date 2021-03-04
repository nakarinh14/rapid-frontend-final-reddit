import React, { useEffect, useState } from 'react';
import {Dimensions, ScrollView, StyleSheet} from "react-native";
import theme from "../theme";
import {Block} from "galio-framework";
import {CommentTree} from "./CommentTree";

const { width } = Dimensions.get('screen');

const _comments = {
    "1": {
        user: "a",
        timestamp: "2h",
        body: "[PURCHASE guide] 2020, ASK ANYTHING!",
        upvotes: 50,
        comments: {
            "1": {
                user: "a",
                timestamp: "2h",
                body: "[PURCHASE guide] 2020, ASK ANYTHING!",
                upvotes: 50

            }
        }
    },
    "2": {
        user: "a",
        timestamp: "2h",
        body: "[PURCHASE guide] 2020, ASK ANYTHING!",
        upvotes: 50,
        comments: {
            "1": {
                user: "a",
                timestamp: "2h",
                body: "[PURCHASE guide] 2020, ASK ANYTHING!",
                upvotes: 50
            },
            "2":{
                user: "YeetMeToTheMoon",
                timestamp: "10m",
                body: "Na u gonna yeet me",
                upvotes: 1012,
                comments:{
                    "1": {
                        user: "a",
                        timestamp: "5m",
                        body: "nope I won't",
                        upvotes: 50,
                        comments: {
                            "1":{
                                user: "YeetMeToTheMoon",
                                timestamp: "1m",
                                body: "yes u do",
                                upvotes: 1012,
                            }
                        }
                    },
                }
            }
        },
    },
    "3": {
        user: "a",
        timestamp: "5d",
        body: "[PURCHASE guide] 2020, ASK ANYTHING!",
        upvotes: 50,
        comments: {
            "1": {
                user: "a",
                timestamp: "1mo",
                body: "[PURCHASE guide] 2020, ASK ANYTHING!",
                upvotes: 50
            }
        },
    },
    "4": {
        user: "a",
        timestamp: "23h",
        body: "[PURCHASE guide] 2020, ASK ANYTHING!",
        upvotes: 50,
        comments: {
            "1": {
                user: "a",
                timestamp: "2h",
                body: "[PURCHASE guide] 2020, ASK ANYTHING!",
                upvotes: 50
            }
        },
    }
};

const useMockData = true

export const CommentSection = ()=> {

    const [comments, setComments] = useState(_comments)

    useEffect(() => {
        if(useMockData){
            setComments(_comments)
        }
    })

    return (
        <ScrollView>
            <Block flex style={styles.cards}>
                {comments && Object.keys(comments).map((comment_id) => {
                    const comment = comments[comment_id]
                    return (
                        <Block
                            key={`card-${comment_id}`}
                            flex
                            style={styles.card}
                        >
                           <CommentTree comment={comment} depth={0} />
                        </Block>
                    )}
                )}
            </Block>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    cards: {
        backgroundColor: theme.COLORS.PAPER,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        backgroundColor: theme.COLORS.WHITE,
        width,
        elevation: theme.SIZES.BASE / 2,
        marginVertical: 2.5,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
});
