import React, {useState} from 'react';
import {Block, NavBar} from "galio-framework";
import {Platform, ScrollView, StyleSheet} from "react-native";
import theme from "../theme";
import PostListComponent from "../components/PostListComponent";
import { SearchBar } from 'react-native-elements';

export const Home = () => {

    const [search, updateSearch] = useState("")

    return (
        <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
            <NavBar
                titleStyle={{fontSize: 19, fontWeight: 'bold'}}
                title="Home"
                style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null}
            />
            <ScrollView>
                <SearchBar
                    platform={"ios"}
                    containerStyle={{paddingHorizontal: 9}}
                    inputContainerStyle={{margin: 0,  maxHeight: 37, backgroundColor: theme.COLORS.PAPER}}
                    inputStyle={{fontSize: 15}}
                    placeholder="Search"
                    onChangeText={updateSearch}
                    value={search}
                />
                <PostListComponent />
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
