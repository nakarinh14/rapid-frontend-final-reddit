import React from 'react';
import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import {Block, Text} from 'galio-framework';
import theme from '../theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('screen');

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna";

export const PostPreviewBold = () => {

    return (
        <Block style={styles.card}>
            <Block row style={styles.cardContent}>
                <Block flex={1}>
                    <Block row>
                        <Block styles={styles.contentArea} flex={3}>
                            <Block style={styles.title}>
                                <Text bold style={styles.titleText}>
                                    {lorem}
                                </Text>
                            </Block>
                            <Block style={styles.content}>
                                <Text style={styles.contentText}>
                                    {lorem}
                                </Text>
                            </Block>
                        </Block>
                    </Block>
                </Block>
                <Block style={{marginVertical: 10}} row>

                    <Block style={{marginRight: 5}} center row>
                        <Text style={styles.groupText} size={14} color={theme.COLORS.BLOCK}>
                            {'Investment'}
                        </Text>
                        <Text color={theme.COLORS.MUTED}> by </Text>
                        <Text style={styles.groupText} size={14} color={theme.COLORS.BLOCK}>
                            {'IAmNotAUser'}
                        </Text>
                    </Block>
                    <Block center row>
                        <Ionicons name="ios-time-outline" size={15} color={theme.COLORS.BLOCK} />
                        <Text size={14} color={theme.COLORS.BLOCK}>{'2h'}</Text>
                    </Block>
                </Block>

                <Block row style={styles.bottomActions}>
                    <Block center row>
                        <TouchableOpacity>
                            <MaterialCommunityIcons size={24} name="arrow-up-bold-outline" color={theme.COLORS.BLOCK}/>
                        </TouchableOpacity>
                        <Block>
                            <Text
                                size={15}
                                color={theme.COLORS.BLOCK}
                                style={{marginLeft: 3, marginRight: 3, fontWeight: '500'}}
                            >
                                {15}
                            </Text>
                        </Block>
                        <TouchableOpacity>
                            <MaterialCommunityIcons size={24} name="arrow-down-bold-outline" color={theme.COLORS.BLOCK}/>
                        </TouchableOpacity>
                    </Block>
                    <Block row center>
                        <Block style={{marginRight: 5}} center>
                            <MaterialCommunityIcons name="comment-outline" size={20} color={theme.COLORS.BLOCK} />
                        </Block>
                        <Text style={{fontWeight: '500'}} size={15} color={theme.COLORS.BLOCK}>
                            {25}
                        </Text>
                    </Block>
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
        width: width * 0.98,
        padding: 10,
        backgroundColor: theme.COLORS.WHITE

    },
    cardContent: {
        padding: theme.SIZES.BASE * 0.3,
        flexDirection: "column"
    },
    cardIcon: {
        // marginRight: theme.SIZES.BASE
        padding: theme.SIZES.BASE * 0.5 ,
        // backgroundColor: theme.COLORS.PRIMARY
    },
    contentArea: {
        // backgroundColor: theme.COLORS.PAPER
    },
    bottomActions: {
        justifyContent: "space-between",
    },
    title:{
        marginBottom: 15
    },
    titleText:{
        fontSize: 18
    },
    contentText: {

    },
    groupText: {
        fontWeight: '500',
    }

})

