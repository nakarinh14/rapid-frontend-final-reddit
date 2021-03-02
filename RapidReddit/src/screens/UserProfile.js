import React  from 'react';
import {StyleSheet, Dimensions, Platform, TouchableOpacity, ScrollView} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {Block, NavBar, Icon, Text} from 'galio-framework';
import theme from '../theme';
import {NavigationContainer} from "@react-navigation/native";
import {UserComments} from "../components/UserComments";
import {UserPosts} from "../components/UserPosts"

const { width } = Dimensions.get('screen');
const profile = {
    username: "xXXStonksToTheMoonXxx",
    comment_upvotes: 505,
    post_upvotes: 4012,
    account_age: "1y"
}

const Tab = createMaterialTopTabNavigator();

export const UserProfile = ({ navigation }) => {

    return (
        <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
            <NavBar
                title={profile.username}
                left={(
                    <TouchableOpacity onPress={() => null}>
                        <Icon
                            name="arrow-left"
                            family="feather"
                            size={theme.SIZES.BASE}
                            color={theme.COLORS.ICON}
                        />
                    </TouchableOpacity>
                )}
                style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null}
            />
            <ScrollView>
                <Block
                    style={styles.achievements}
                >
                    <Block style={styles.displayScores} >
                        <Text style={styles.subStatTitle}>{profile.comment_upvotes}</Text>
                        <Text color={theme.COLORS.GREY}>Comment</Text>
                        <Text color={theme.COLORS.GREY}>Upvotes</Text>
                    </Block>
                    <Block style={styles.displayScores}>
                        <Text style={styles.subStatTitle}>{profile.post_upvotes}</Text>
                        <Text color={theme.COLORS.GREY}>Post</Text>
                        <Text color={theme.COLORS.GREY}>Upvotes</Text>

                    </Block>
                    <Block style={styles.displayScores}>
                        <Text style={styles.subStatTitle}>{profile.account_age}</Text>
                        <Text color={theme.COLORS.GREY}>Age</Text>
                    </Block>
                </Block>
                <NavigationContainer>
                    <Tab.Navigator>
                        <Tab.Screen name="Posts" component={UserPosts} />
                        <Tab.Screen name="Comments" component={UserComments} />
                    </Tab.Navigator>
                </NavigationContainer>
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
    }
});
