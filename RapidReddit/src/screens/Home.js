import React from 'react';
import {Block, NavBar} from "galio-framework";
import {PostPreview} from "../components/PostPreview";
import {Platform, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import theme from "../theme";

const tmp = [1,1,1,1,1,1,1,1,1]

export const Home = ({navigation}) => {

    return (
        <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
            <NavBar
                titleStyle={{fontSize: 19, fontWeight: 'bold'}}
                title="Home"
                style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null}
            />
            <ScrollView>
                <Block flex column>
                    {tmp.map((val, idx) =>
                        <Block key={idx}>
                            <TouchableOpacity
                                key={idx}
                                onPress={() => navigation.push("Post")}>
                                <PostPreview />
                            </TouchableOpacity>
                            <View style={styles.line}  />
                        </Block>
                    )}
                </Block>
            </ScrollView>
        </Block>
    )
}
const styles = StyleSheet.create({
    line: {
        borderBottomColor: theme.COLORS.LINE,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 10
    },
})
