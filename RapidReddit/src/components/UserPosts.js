import React from 'react';
import {ActivityIndicator, StyleSheet, TouchableOpacity, View} from "react-native";
import {Block} from "galio-framework";
import {PostPreview} from "./PostPreview";
import theme from "../theme";
import {withInteractionsManaged} from "./withInteractionsManaged";

const tmp = [1,1,1,1,1,1,1];

const UserPosts = ({ navigation }) => {

    // For some reason, navigation is acting weird here
    return (
        <Block flex column>
            {tmp.map((val, idx) =>
                <Block style={{marginBottom: 5}} key={idx}>
                    <TouchableOpacity
                        key={idx}
                        onPress={() => {}}>
                        <PostPreview />
                    </TouchableOpacity>
                </Block>
            )}
        </Block>
    )
}
const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
    line: {
        borderBottomColor: theme.COLORS.LINE,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 10
    },
});

export default withInteractionsManaged(UserPosts, ActivityIndicator)
