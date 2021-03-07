import React from 'react';
import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import {Block,Card,Text} from 'galio-framework';
import theme from "../theme";

export const CommunityPreview = () => {
    return (
        <Card
            style={styles.subredditPreview}
            title="Subreddit"
            caption="Some description"
            avatar="https://i.imgur.com/JcUJXxgl.png">
        </Card>
    )
}

const styles = StyleSheet.create({
    subredditPreview: {
        margin: 10,
        backgroundColor: 'white',
    }
})
