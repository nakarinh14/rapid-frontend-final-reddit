import React, { useEffect, useState } from 'react';
import {Dimensions, ScrollView, StyleSheet} from "react-native";
import theme from "../theme";
import {Block} from "galio-framework";
import {CommentTree} from "./CommentTree";

const { width } = Dimensions.get('screen');

export const CommentSection = ({ comments })=> {

    return (
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
