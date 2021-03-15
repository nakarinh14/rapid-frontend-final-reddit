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
            window.console.log(Object.keys(snapshot.val() || []))
            setSubreddits(snapshot.val())
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
                    {Object.keys(subreddits || []).map((key, idx) =>
                        <TouchableOpacity component={SubredditPreview} key={idx} onPress={() => navigation.navigate('Subreddit', {subredditId: key})}>
                            <SubredditPreview props={subreddits[key]}/>
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
