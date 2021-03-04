import React  from 'react';
import {Block, Text} from "galio-framework";
import { StyleSheet, TouchableOpacity, View} from "react-native";
import theme from "../theme";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const indentColor = (depth) => {
    const colors = ['red', 'orange', '#e9de1a', 'green']
    if(depth > 0){
        return {borderLeftColor: colors[depth-1], ...styles.indented}
    }
    return null
}

const paddedFlex = (depth) => {
    const idx = depth ? depth : 0
    const indents = [0, 4, 6, 8, 10]
    return indents[idx]
}

export const Comment = ({ comment, depth }) => {

    const emptyPadded = paddedFlex(depth)
    const padded = 100 - emptyPadded
    return (
        <Block style={{flexDirection: "row", alignItems: 'center', justifyContent: 'flex-end'}}>
            <Block style={{flex: emptyPadded}} />
            <Block style={[styles.commentBlock, {flex: padded}]}>
                {depth ? <View style={[styles.line]}  /> : null }
                <Block style={[styles.box, indentColor(depth)]} >
                    <Block style={styles.topInfo} >
                        <Block style={styles.topLeftFlex} >
                            <View>
                                <Text style={styles.titleText}>
                                    {comment.user}
                                </Text>
                            </View>
                            <View style={styles.upvotes}>
                                <MaterialCommunityIcons name="arrow-up-bold-outline" color={theme.COLORS.MUTED}/>
                                <Text style={styles.timestampText}>
                                    {comment.upvotes}
                                </Text>
                            </View>
                        </Block>
                        <Block style={styles.topRightFlex}>
                            <TouchableOpacity
                                onPress={() => {
                                }}
                            >
                            <View style={{marginRight: 7}}>
                                <Ionicons name="ios-ellipsis-horizontal" size={22} color={theme.COLORS.MUTED} />
                            </View>
                            </TouchableOpacity>
                            <View>
                                <Text style={styles.timestampText}>
                                    {comment.timestamp}
                                </Text>
                            </View>
                        </Block>
                    </Block>

                    <Text style={styles.commentText}>
                        {comment.body}
                    </Text>
                </Block>
            </Block>
        </Block>
    )
}


const styles = StyleSheet.create({
    titleText: {
        fontWeight: '600',
        color: theme.COLORS.BLACK,
        fontSize: 14.6
    },
    captionText:{
        color: theme.COLORS.GREY
    },
    commentText: {
        marginTop: 7,
        color: theme.COLORS.BLACK,
        fontSize: 14.6
    },
    timestampText: {
        color: theme.COLORS.GREY
    },
    topLeftFlex:{
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: "row",
    },
    topInfo: {
        marginTop: theme.SIZES.BASE * 0.175,
        marginBottom: theme.SIZES.BASE * 0.175,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: "row",
    },
    caption:{
        flexDirection: "row",
    },
    topRightFlex: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: "row",
        marginRight: 10
    },
    upvotes: {
        alignItems: 'center',
        flexDirection: "row",
        marginLeft: 5
    },
    box:{
        paddingLeft: 10,
        justifyContent: 'center',
        paddingBottom: 5,
    },
    line:{
        borderBottomColor: theme.COLORS.LINE,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 10
    },
    indented:{
        borderLeftWidth: 2,
        borderTopLeftRadius: 1,
        borderBottomLeftRadius: 1,
    },
    commentBlock: {
        marginBottom: 10,
    }
});
