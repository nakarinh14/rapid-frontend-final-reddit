import React, {useEffect, useState} from 'react';
import {Block, NavBar, Text} from "galio-framework";
import {Platform, ScrollView, TouchableOpacity, View, StyleSheet} from "react-native";
import theme from "../theme";
import * as SubredditService from '../services/SubredditService'
import SubredditPreview from "../components/SubredditPreview";
import { Ionicons } from '@expo/vector-icons';
import CreateSubredditModal from '../components/CreateSubredditModal'

export const Explore = ({navigation}) => {

    const [subreddits, setSubreddits] = useState([]);

    useEffect(() => {

        const subredditsRef = SubredditService.getRefForSubreddits()

        subredditsRef.on('value', snapshot => {
            window.console.log(Object.keys(snapshot.val() || []))
            setSubreddits(snapshot.val())
        })

        return () => {
            subredditsRef.off('value')
        }


    },[])


    return (
        <Block safe flex>
            <NavBar
                titleStyle={{fontSize: 19, fontWeight: 'bold'}}
                title="Explore"
                style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null}
                right={(
                    <CreateSubredditModal navigation={navigation}
                        //If you wanna use a custom add button to start the modal
                        //                  addButton={(
                        //     <Button>Test</Button>
                        // )}

                    />
                )}
            />
            <ScrollView>
                <Block>
                    {Object.keys(subreddits || []).map((key, idx) =>
                        <TouchableOpacity component={SubredditPreview} key={idx} onPress={() => navigation.navigate('Subreddit', {subredditId: key})}>
                            <SubredditPreview props={subreddits[key]}/>
                        </TouchableOpacity>
                    )}

                </Block>
                <Block row center style={{marginTop: 30}} onpress={(<CreateSubredditModal navigation={navigation}/>)}>
                    <Block style={{marginRight: 5}} center>
                        <Ionicons name="create-outline" size={22} color={theme.COLORS.BLOCK}/>
                    </Block>
                    <Text style={{fontWeight: '500'}} size={15} color={theme.COLORS.BLOCK}>
                        {'Create your own subreddit'}
                    </Text>
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
