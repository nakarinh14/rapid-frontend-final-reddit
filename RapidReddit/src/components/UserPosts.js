import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, TouchableOpacity, View} from "react-native";
import {Block} from "galio-framework";
import {PostPreview} from "./PostPreview";
import theme from "../theme";
import {withInteractionsManaged} from "./withInteractionsManaged";
import {firebase} from '../firebase'
import { getRefForUserPosts } from "../services/PostService";

const UserPosts = ({ navigation }) => {

    const [ userPosts, setUserPosts ] = useState([])

    useEffect(() => {
        const userRef = getRefForUserPosts("username")
        userRef.on('value', snapshot => {
            setUserPosts(Object.values(snapshot.val() | {}))
        })
    }, [])

    return (
        <Block flex column>
            {userPosts.map((val, idx) =>
                <Block style={{marginBottom: 5}} key={idx}>
                    <PostPreview touchable post={val}/>
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
