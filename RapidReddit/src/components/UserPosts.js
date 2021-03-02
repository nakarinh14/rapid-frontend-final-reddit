import React from 'react';
import {StyleSheet, View} from "react-native";

export const UserPosts = ({ uid }) => {
    return (
        <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
    )
}
const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
});
