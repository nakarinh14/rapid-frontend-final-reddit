import React, {useContext} from 'react';
import {ActivityIndicator, StyleSheet} from "react-native";
import theme from "../theme";
import {withInteractionsManaged} from "./withInteractionsManaged";
import PostListComponent from "./PostListComponent";
import AuthenticationContext from "../contexts/AuthenticationContext";

const UserPosts = ({ route }) => {
    const { uid } = route.params
    const {user} = useContext(AuthenticationContext)

    const displayName = uid ? uid : user?.displayName
    return (
        <PostListComponent userId={uid} />
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
