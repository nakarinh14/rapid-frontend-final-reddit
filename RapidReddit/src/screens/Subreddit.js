import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Platform, TouchableOpacity, ScrollView} from 'react-native';
import {Block, NavBar, Icon, Text} from 'galio-framework';
import theme from '../theme';
import PostListComponent from "../components/PostListComponent";
import * as SubredditService from '../services/SubredditService'
import { Ionicons } from '@expo/vector-icons';
import CreatePostModal from "../components/CreatePostModal";
import {SearchBar} from "react-native-elements";
import AuthenticationContext from "../contexts/AuthenticationContext";


export const Subreddit = ({ route, navigation }) => {

    const { subreaditName } = route.params
    const [search, updateSearch] = useState("")
    const [subreadit, setSubreadit] = useState({
            name: "Loading",
            description: "Loading",
            creator: "Loading",
            subscribers: 0,
            date_created: 0
    });
    const {user} = useContext(AuthenticationContext)
    const owner = user ? subreadit.creator === user.displayName : false
    useEffect(() => {
        const subreaditRef = SubredditService.getRefForSubreddit(subreaditName)
        subreaditRef.on('value', snapshot => {
            if(snapshot.exists()){
                setSubreadit(snapshot.val())
            }
        })
        return () => {
            subreaditRef.off('value')
        }
    },[])

    return (
        <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
            <NavBar
                titleStyle={{fontSize: 17, fontWeight: 'bold'}}
                title={subreadit.name}
                left={
                    (<TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon
                            name="arrow-left"
                            family="feather"
                            size={28}
                            color={theme.COLORS.ICON}
                        />
                    </TouchableOpacity>)
                }
                right = {(
                    <Block row>
                        {
                            owner ?
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("EditSubreddit", {subreaditName})}
                                >
                                    <Ionicons name="pencil-outline" size={28} color={theme.COLORS.BLOCK}/>
                                </TouchableOpacity> : null
                        }
                        <CreatePostModal navigation={navigation} subreadit={subreaditName} />
                    </Block>
                )}
                style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null}

            />
            <ScrollView>
                <Block
                    style={styles.achievements}
                >
                    <Block style={styles.displayScores}>
                        <Text style={styles.subStatTitle}>
                            Created By
                        </Text>
                        <Text color={theme.COLORS.GREY}>
                            {subreadit.creator}
                        </Text>
                    </Block>
                </Block>
                <Block style={{marginTop: 15}}>
                    <Text style={styles.description}>
                        {subreadit.description}
                    </Text>
                </Block>
                <SearchBar
                    platform={"ios"}
                    containerStyle={{paddingHorizontal: 9}}
                    inputContainerStyle={{margin: 0,  maxHeight: 37, backgroundColor: theme.COLORS.PAPER}}
                    inputStyle={{fontSize: 15}}
                    placeholder="Search"
                    onChangeText={updateSearch}
                    value={search}
                />
                <PostListComponent subreadit={subreaditName} />
            </ScrollView>
        </Block>
    );
}

const styles = StyleSheet.create({
    achievements: {
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: "stretch",
        marginVertical: 10,
    },
    subStatTitle: {
        marginBottom: theme.SIZES.BASE * 0.4,
        fontSize: 20,
        fontWeight: "500",
    },
    displayScores: {
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 100,
        flexDirection: "column",
        justifyContent: 'flex-start',
        alignItems: "center",
    },
    scene: {
        flex: 1,
    },
    attachTop:{
        top: 0,
        position: 'absolute'
    },
    description:{
        textAlign: 'center',
        marginHorizontal: 30
    }
});
