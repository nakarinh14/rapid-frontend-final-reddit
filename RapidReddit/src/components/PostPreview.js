import React, {useContext, useState} from 'react';
import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import {Block, Text} from 'galio-framework';
import theme from '../theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";
import AuthenticationContext from "../contexts/AuthenticationContext";
import CommentReplyModal from "./CommentReplyModal";

const { width } = Dimensions.get('screen');

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna";

function PostInfo(props) {

    const {post} = props

    return(
        <Block row>
            <Block flex={3}>
                <Block style={styles.title}>
                    <Text style={styles.titleText}>
                        {post.title}
                    </Text>
                </Block>
                <Block style={styles.content}>
                    <Text style={styles.contentText}>
                        {post.caption}
                    </Text>
                </Block>
            </Block>
        </Block>
    )
}

function PostTitleContent(props) {
    const { touchable, onPress, post } = props
    if(touchable) return (
            <TouchableOpacity onPress={onPress}>
                <PostInfo post={post}/>
            </TouchableOpacity>
        )
    else return (
            <PostInfo post={post}/>
        )
}

export const PostPreview = (props) => {

    const navigation = useNavigation();
    const { touchable, post } = props

    const [ replyModal, setReplyModal ] = useState(false)

    const authentication = useContext(AuthenticationContext)

    const onPress = () => {
        navigation.push("Post",{postId: post.id})
    }

    return (
        <Block style={styles.card}>
            <Block row style={styles.cardContent}>
                <Block flex={1}>
                    <PostTitleContent post={post} onPress={onPress} touchable={touchable}/>
                </Block>
                <Block style={{marginVertical: 10}} row>

                    <Block style={{marginRight: 5}} center row>
                        <Text style={styles.groupText} size={14} color={theme.COLORS.BLOCK}>
                            {post.subreadit}
                        </Text>
                        <Text color={theme.COLORS.MUTED}> by </Text>
                        <TouchableOpacity
                            onPress={() => navigation.push("User")}
                        >
                            <Text style={styles.groupText} size={14} color={theme.COLORS.BLOCK}>
                                {post.user}
                            </Text>
                        </TouchableOpacity>
                    </Block>
                    <Block center row>
                        <Ionicons name="ios-time-outline" size={15} color={theme.COLORS.BLOCK} />
                        <Text size={14} color={theme.COLORS.BLOCK}>{'2h'}</Text>
                    </Block>
                </Block>
                <Block row style={styles.bottomActions}>
                    <Block center row>
                        <TouchableOpacity>
                            <MaterialCommunityIcons
                                size={24}
                                name="arrow-up-bold-outline"
                                color={theme.COLORS.BLOCK}
                            />
                        </TouchableOpacity>
                        <Block>
                            <Text
                                size={15}
                                color={theme.COLORS.BLOCK}
                                style={{marginLeft: 3, marginRight: 3, fontWeight: '500'}}
                            >
                                {post.karma}
                            </Text>
                        </Block>
                        <TouchableOpacity>
                            <MaterialCommunityIcons
                                size={24}
                                name="arrow-down-bold-outline"
                                color={theme.COLORS.BLOCK}
                            />
                        </TouchableOpacity>
                    </Block>
                    <TouchableOpacity style={{flexDirection:"row", alignItems:"center"}} onPress={() => setReplyModal(true)} >
                        <Block style={{marginRight: 5}} center>
                            <MaterialCommunityIcons
                                name="comment-outline"
                                size={20}
                                color={theme.COLORS.BLOCK}
                            />
                            <CommentReplyModal visible={replyModal} visibilitySetter={setReplyModal}/>
                        </Block>
                        <Text style={{fontWeight: '500'}} size={15} color={theme.COLORS.BLOCK}>
                            {post.comments_freq}
                        </Text>
                    </TouchableOpacity>
                    <Block row center>
                        <Block style={{marginRight: 5}} center>
                            <Ionicons name="share-outline" size={22} color={theme.COLORS.BLOCK}/>
                        </Block>
                        <Text style={{fontWeight: '500'}} size={15} color={theme.COLORS.BLOCK}>
                            {'Share'}
                        </Text>
                    </Block>
                    <Block row center>
                        <Ionicons
                            name="ios-ellipsis-horizontal"
                            size={21}
                            color={theme.COLORS.BLOCK}
                        />
                    </Block>
                </Block>
            </Block>
        </Block>
    )

}

const styles = StyleSheet.create({
    card: {
        padding: 10,
        backgroundColor: theme.COLORS.WHITE

    },
    cardContent: {
        padding: theme.SIZES.BASE * 0.3,
        flexDirection: "column"
    },
    cardIcon: {
        padding: theme.SIZES.BASE * 0.5 ,
    },
    bottomActions: {
        justifyContent: "space-between",
    },
    title:{
      marginBottom: 15
    },
    titleText:{
      fontSize: 17
    },
    contentText: {
        color: theme.COLORS.BLOCK
    },
    groupText: {
        fontWeight: '500',
    }

})


