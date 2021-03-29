import React from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'galio-framework';
import theme from "../theme";

function SubredditPreview({subreadit}){
    return (
        <Card
            shadow={false}
            style={styles.subredditPreview}
            title={subreadit.name}
            caption={subreadit.description}
            avatar="https://globalactionplan.ie/wp-content/uploads/2016/08/Community-Icon.jpg">
        </Card>
    )
}

const styles = StyleSheet.create({
    subredditPreview: {
        margin: 9,
        backgroundColor: 'white',
        borderColor: theme.COLORS.LINE
    }
})

export default SubredditPreview;
