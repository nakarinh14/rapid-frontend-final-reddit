import React from 'react';
import {ActivityIndicator, ScrollView, StyleSheet} from "react-native";
import theme from "../theme";
import {withInteractionsManaged} from "./withInteractionsManaged";
import PostListComponent from "./PostListComponent";

const UserPosts = ({ navigation }) => {

    return (
        <PostListComponent user={"username"}/>
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
