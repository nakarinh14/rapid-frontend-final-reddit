import React, {useState} from 'react';
import {Block, Icon} from "galio-framework";
import {PostPreview} from "../components/PostPreview";
// import {PostPreviewBold} from "../components/PostPreviewBold";
import CommentSection from "../components/CommentSection"
import {Platform, ScrollView, TouchableOpacity } from "react-native";
import { NavBar } from 'galio-framework';
import theme from "../theme";
import {ReplyPostModal} from "../components/ReplyPostModal";


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

const Post = ({navigation}) => {

    const [replyPost, setReplyPost] = useState("")
    const [isReplyPostVisible, setReplyPostVisible] = useState(false)

    return (
        <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
            <NavBar
                titleStyle={{fontSize: 19, fontWeight: 'bold'}}
                title={`${post.comments_freq} Comments`}
                left={(
                    <TouchableOpacity onPress={() => navigation.goBack()}>
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
                        commentAction={() => setReplyPostVisible(true)}
                    />
                    <CommentSection comments={comments}/>
                </Block>
            </ScrollView>
            <ReplyPostModal
                isModalVisible={isReplyPostVisible}
                closeModal={() => setReplyPostVisible(false)}
                currentText={replyPost}
                setCurrentText={setReplyPost}
            />
        </Block>
    )
}

export default Post;
