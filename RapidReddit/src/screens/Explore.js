import React, {useEffect, useState} from 'react';
import {Block, Card, NavBar, Text} from "galio-framework";
import {Platform, ScrollView, TouchableOpacity, View, StyleSheet} from "react-native";
import {CommunityPreview} from "../components/CommunityPreview";
import theme from "../theme";
import * as SubredditService from '../services/SubredditService'
import SubredditPreview from "../components/SubredditPreview";



export const Explore = ({navigation}) => {

    const [subreddits, setSubreddits] = useState([]);


    useEffect(() => {

        const subredditsRef = SubredditService.getRefForSubreddits()

        subredditsRef.on('value', snapshot => {
            window.console.log(snapshot.val())
            window.console.log(Object.values(snapshot.val() || []))
            setSubreddits(Object.values(snapshot.val() || []))
        })

        return function cleanup() {
            subredditsRef.off('value')
        }


    },[])


    return (
        <Block safe flex>
            <NavBar
                titleStyle={{fontSize: 19, fontWeight: 'bold'}}
                title="Explore"
            />
            <ScrollView>
                <Block>
                    {subreddits.map((val, idx) =>
                        <TouchableOpacity component={SubredditPreview} key={idx} onPress={() => navigation.navigate('Subreddit', {subredditId: val})}>
                            <SubredditPreview props={val}/>
                        </TouchableOpacity>
                    )}
                    
                </Block>
            </ScrollView>
        </Block>
    )
}


const styles = StyleSheet.create({
    subredditPreview: {
        margin: 10,
        backgroundColor: 'white',
    }
})
