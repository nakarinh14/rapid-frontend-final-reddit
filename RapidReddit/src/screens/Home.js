import React from 'react';
import {Block, NavBar} from "galio-framework";
import {Platform, ScrollView, StyleSheet} from "react-native";
import CreatePostModal from '../components/CreatePostModal'
import theme from "../theme";
import PostListComponent from "../components/PostListComponent";

export const Home = ({navigation}) => {

    return (
        <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
            <NavBar
                titleStyle={{fontSize: 19, fontWeight: 'bold'}}
                title="Home"
                style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null}
                right={(
                    <CreatePostModal
                        navigation={navigation}
                        subreadit={"home"}
                    />
                )}
            />
            <ScrollView>
                <PostListComponent subreadit={"home"}/>
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
    createPostButton: {
        //Hopefully makes icon easier to touch
        padding: 10
    }
})
