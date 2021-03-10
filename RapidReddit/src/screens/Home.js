import React, {useEffect, useState} from 'react';
import {Block, Button, Icon, NavBar} from "galio-framework";
import {PostPreview} from "../components/PostPreview";
import {Platform, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
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
                    <CreatePostModal navigation={navigation} subreadit={"home"}
                        //If you wanna use a custom add button to start the modal
                        //                  addButton={(
                        //     <Button>Test</Button>
                        // )}

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
