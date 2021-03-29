import React, {useContext, useEffect, useState} from 'react';
import {
    StyleSheet,
    Platform,
    TouchableOpacity,
    ScrollView,
    RefreshControl,
    ActivityIndicator,
    View
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {Block, NavBar, Icon, Text} from 'galio-framework';
import theme from '../theme';
import UserComments from "../components/UserComments";
import UserPosts from "../components/UserPosts"
import {firebase} from "../firebase";
import "firebase/auth";
import AuthenticationContext from "../contexts/AuthenticationContext";
import {UnauthenticatedScreen} from "./UnauthenticatedScreen";
import {getDisplayDate} from "../utils/post-date";
import {getCommentsForUser} from "../services/CommentsService";
import ProfileContext from "../contexts/ProfileContext";

const profile = {
    username: "Loading",
    comment_karma: 0,
    post_karma: 0,
    date_created: "Loading"
};

const Tab = createMaterialTopTabNavigator();

export const UserProfile = ({ route, navigation }) => {
    const { user } = useContext(AuthenticationContext)
    const { owner, username } = route.params
    if(owner && !user){
        return (
           <UnauthenticatedScreen navigation={navigation} />
        )
    }

    const displayName = owner ? user?.displayName : username
    return (
        <RenderProfile
            owner={owner}
            username={displayName}
            navigation={navigation}
        />
    );
}

const RenderProfile = ({navigation, owner, username}) => {
    // If it is owner, use current displayName, else just use provided username from navigation path
    const [userStats, setUserStats] = useState(profile)
    const ref = firebase.database().ref(`user_profile/${username}/stats`)

    const [userComments, setUserComments] = useState({})
    const [refreshing, setRefreshing] = useState(false)
    // It's a known issue that all tab are set to highest height tab,
    // causing weird looking UI. Hide them when out of focus.
    // Not ideal :(
    const [activeTab, setActiveTab] = useState('tab1')

    const fetchUserComments = async() => {
        try {
            const res = await getCommentsForUser(username).get()
            setUserComments(res)
        } catch (err) {
            console.log(err)
        }
    }

    const refreshProfile = () => fetchUserComments() // incase post got involved, as it's not doing too well.
    const onRefresh = async() =>{
        setRefreshing(true)
        try{
            await refreshProfile()
        } catch (err){
            console.log(err)
        }
        setRefreshing(false)
    }
    useEffect(() => {
        if(username){
            refreshProfile()
            const listener = ref.on('value', (snapshot) => {
                if(snapshot.exists()){
                    const data = snapshot.val()
                    setUserStats({
                        username,
                        comment_karma: data.comment_karma,
                        post_karma: data.post_karma,
                        date_created: getDisplayDate(data.date_created)
                    })
                }
            })
            return () => ref.off('value', listener)
        }
    }, [username])

    const profileContextVal = {
        refreshProfile,
        userComments
    }
    return (
        <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
            <NavBar
                titleStyle={{fontSize: 17, fontWeight: 'bold'}}
                title={username}
                left={!owner ?
                    (<TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon
                            name="arrow-left"
                            family="feather"
                            size={28}
                            color={theme.COLORS.ICON}
                        />
                    </TouchableOpacity>): null
                }
                right={ owner ?
                    <TouchableOpacity onPress={() => firebase.auth().signOut()}>
                        <Icon
                            name="log-out"
                            family="feather"
                            size={20}
                            color={theme.COLORS.ICON}
                        />
                    </TouchableOpacity> : null
                }
                style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null}
            />
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <Block
                    style={styles.achievements}
                >
                    <Block style={styles.displayScores} >
                        <Text style={styles.subStatTitle}>{userStats.comment_karma}</Text>
                        <Text color={theme.COLORS.GREY}>Comment</Text>
                        <Text color={theme.COLORS.GREY}>Upvotes</Text>
                    </Block>
                    <Block style={styles.displayScores}>
                        <Text style={styles.subStatTitle}>{userStats.post_karma}</Text>
                        <Text color={theme.COLORS.GREY}>Post</Text>
                        <Text color={theme.COLORS.GREY}>Upvotes</Text>

                    </Block>
                    <Block style={styles.displayScores}>
                        <Text style={styles.subStatTitle}>{userStats.date_created}</Text>
                        <Text color={theme.COLORS.GREY}>Age</Text>
                    </Block>
                </Block>
                <Block flex>
                    <ProfileContext.Provider value={profileContextVal} >
                        <Tab.Navigator>
                            <Tab.Screen
                                name="Posts"
                                component={activeTab === 'tab1' ? UserPosts : DefaultScreen }
                                initialParams={{username}}
                                listeners={{ focus: () => setActiveTab('tab1') }}
                            />
                            <Tab.Screen
                                name="Comments"
                                component={activeTab === 'tab2' ? UserComments : DefaultScreen}
                                listeners={{ focus: () => setActiveTab('tab2') }}
                            />
                        </Tab.Navigator>
                    </ProfileContext.Provider>
                </Block>
            </ScrollView>
        </Block>
    )
}

const DefaultScreen = () => (
    <View
        alignItems="center"
        justifyContent="center"
        style={{backgroundColor: theme.COLORS.PAPER}}
    >
        <ActivityIndicator style={{marginTop: 20}} size="large" animating />
    </View>
)

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
