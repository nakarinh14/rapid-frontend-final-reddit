import React from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'galio-framework';

function SubredditPreview({subreadit}){
    return (
        <Card
            style={styles.subredditPreview}
            title={subreadit.name}
            caption={subreadit.description}
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

export default SubredditPreview;
