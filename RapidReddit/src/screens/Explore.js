import React from 'react';
import {Block, NavBar, Text} from "galio-framework";
import {Platform, ScrollView, TouchableOpacity, View} from "react-native";
import {CommunityPreview} from "../components/CommunityPreview";
import theme from "../theme";

export const Explore = ({navigation}) => {
    return (
        <Block safe flex>
            <NavBar
                titleStyle={{fontSize: 19, fontWeight: 'bold'}}
                title="Explore"
            />
            <ScrollView>
                <Block>
                    <TouchableOpacity onPress={() => navigation.navigate('Subreddit', {subredditId: 'kdbajdbhj'})}>
                        <CommunityPreview/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <CommunityPreview/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <CommunityPreview/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <CommunityPreview/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <CommunityPreview/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <CommunityPreview/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <CommunityPreview/>
                    </TouchableOpacity>
                </Block>
            </ScrollView>
        </Block>
    )
}
