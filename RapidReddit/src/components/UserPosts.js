import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from "react-native";
import theme from "../theme";
import {withInteractionsManaged} from "./withInteractionsManaged";
import PostListComponent from "./PostListComponent";
import AuthenticationContext from "../contexts/AuthenticationContext";

const UserPosts = ({ route }) => {
    const { username } = route.params
    const { user } = useContext(AuthenticationContext)

    const displayName = username ? username : user?.displayName
    return (
        <PostListComponent username={displayName} />
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

export default withInteractionsManaged(UserPosts)
