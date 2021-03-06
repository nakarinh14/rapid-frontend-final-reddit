import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {Block} from "galio-framework";
import {PostPreview} from "./PostPreview";
import {useNavigation} from "@react-navigation/native";
import theme from "../theme";

const tmp = [1,1,1,1,1,1,1];

export const UserPosts = ({ navigation, uid }) => {

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
