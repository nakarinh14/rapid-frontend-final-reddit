import React, {useEffect, useState} from 'react';
import {StyleSheet, Platform, TouchableOpacity, ScrollView} from 'react-native';
import {Block, NavBar, Icon, Text} from 'galio-framework';
import theme from '../theme';
import PostListComponent from "../components/PostListComponent";
import * as SubredditService from '../services/SubredditService'
<<<<<<< HEAD
import { Ionicons } from '@expo/vector-icons';

=======
import CreatePostModal from "../components/CreatePostModal";
>>>>>>> 1d08a5087463936853af681c51af9b2771bfbf52

export const Subreddit = ({ route, navigation }) => {

    const { subredditId, subreaditName } = route.params
    const [subreadit, setSubreadit] = useState({
            name: "",
            description: "",
            subscribers: 0,
            date_created: 0
    });
    useEffect(() => {
        const subredditRef = SubredditService.getRefForSubreddit(subredditId)
        subredditRef.on('value', snapshot => {
            if(snapshot.exists()){
                setSubreadit(snapshot.val())
            }
        })
        return () => {
            subredditRef.off('value')
        }
    },[])

    return (
        <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
            <NavBar
<<<<<<< HEAD
                title={subreddit.name}

=======
                title={subreadit.name}
>>>>>>> 1d08a5087463936853af681c51af9b2771bfbf52
                left={
                    (<TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon
                            name="arrow-left"
                            family="feather"
                            size={24}
                            color={theme.COLORS.ICON}
                        />
                    </TouchableOpacity>)
                }
<<<<<<< HEAD
                right = {owner ? 
                (<TouchableOpacity onPress={() => navigation.navigate("EditSubreddit", {subredditId: subredditId})}>
                        <Ionicons name="pencil-outline" size={22} color={theme.COLORS.BLOCK}/>
                    </TouchableOpacity>) : null
=======
                right={
                    (<CreatePostModal navigation={navigation} subreadit={subreaditName} />)
>>>>>>> 1d08a5087463936853af681c51af9b2771bfbf52
                }
                style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null}

            />
            <ScrollView>
                <Block
                    style={styles.achievements}
                >
                    <Block style={styles.displayScores}>
                        <Text style={styles.subStatTitle}>{subreadit.subscribers}</Text>
                        <Text color={theme.COLORS.GREY}>Members</Text>
                    </Block>
                </Block>
                <Text style={styles.description}>
                    {subreadit.description}
                </Text>
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
