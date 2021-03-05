import React, {useState} from 'react';
import {Block, Icon} from "galio-framework";
import {PostPreview} from "../components/PostPreview";
import {PostPreviewBold} from "../components/PostPreviewBold";
import {CommentSection} from "../components/CommentSection"
import {Platform, ScrollView, TextInput, TouchableOpacity, View} from "react-native";
import { NavBar } from 'galio-framework';
import theme from "../theme";

const comments = {
    "1": {
        user: "a",
        timestamp: "2h",
        body: "[PURCHASE guide] 2020, ASK ANYTHING!",
        upvotes: 50,
        comments: {
            "1": {
                user: "a",
                timestamp: "2h",
                body: "[PURCHASE guide] 2020, ASK ANYTHING!",
                upvotes: 50

            }
        }
    },
    "2": {
        user: "a",
        timestamp: "2h",
        body: "[PURCHASE guide] 2020, ASK ANYTHING!",
        upvotes: 50,
        comments: {
            "1": {
                user: "a",
                timestamp: "2h",
                body: "[PURCHASE guide] 2020, ASK ANYTHING!",
                upvotes: 50
            },
            "2":{
                user: "YeetMeToTheMoon",
                timestamp: "10m",
                body: "Na u gonna yeet me",
                upvotes: 1012,
                comments:{
                    "1": {
                        user: "a",
                        timestamp: "5m",
                        body: "nope I won't",
                        upvotes: 50,
                        comments: {
                            "1":{
                                user: "YeetMeToTheMoon",
                                timestamp: "1m",
                                body: "yes u do",
                                upvotes: 1012,
                            }
                        }
                    },
                }
            }
        },
    },
    "3": {
        user: "a",
        timestamp: "5d",
        body: "[PURCHASE guide] 2020, ASK ANYTHING!",
        upvotes: 50,
        comments: {
            "1": {
                user: "a",
                timestamp: "1mo",
                body: "[PURCHASE guide] 2020, ASK ANYTHING!",
                upvotes: 50
            }
        },
    },
    "4": {
        user: "a",
        timestamp: "23h",
        body: "[PURCHASE guide] 2020, ASK ANYTHING!",
        upvotes: 50,
        comments: {
            "1": {
                user: "a",
                timestamp: "2h",
                body: "[PURCHASE guide] 2020, ASK ANYTHING!",
                upvotes: 50
            }
        },
    }
};
const post = {
    author: "uid",
    timestamp: "2018-20-blabla",
    upvotes: 10,
    downvotes: 10,
    comments_freq: 152,
    content: {
        title: "This is awesome",
        body: "Skrrrrr"
    }
}

export const Post = ({navigation}) => {

    const [replyPost, setReplyPost] = useState("")

    return (
        <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
            <NavBar
                titleStyle={{fontSize: 19, fontWeight: 'bold'}}
                title={`${post.comments_freq} Comments`}
                left={(
                    <TouchableOpacity onPress={() => null}>
                        <Icon
                            name="arrow-left"
                            family="feather"
                            size={24}
                            color={theme.COLORS.ICON}
                        />
                    </TouchableOpacity>
                )}
                style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null}
            />
            <ScrollView>
                <Block>
                    <PostPreview
                        title={post.content.title}
                        iconName={''}
                        iconFamily={''}
                        caption={post.content.body}
                        updoots={10}
                    />
                    <CommentSection comments={comments}/>
                </Block>
            </ScrollView>
        </Block>
    )
}
