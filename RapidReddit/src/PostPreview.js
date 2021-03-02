import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import {Block, Card, Icon, Text} from 'galio-framework';
import theme from './theme';

const { width, height } = Dimensions.get('screen');

export default class PostPreview extends React.Component {
    render() {
        const { title, icon, caption, updoots } = this.props;
        console.log(this.props)
        // styles.card.height = heightFixed || height * heightMultiplier || 200
        // cardStyle.height = heightFixed || height * heightMultiplier || 200
        return (
            <Block card style={styles.card}>
                <Block row style={styles.cardContent}>
                    <Block flex={1}>
                        <TouchableOpacity>
                            <Block row>
                                <Block left center flex={1} style={styles.cardIcon}>
                                    <Icon name={icon} family="AntDesign" size={theme.SIZES.BASE * 3}/>
                                </Block>
                                <Block styles={styles.contentArea} flex={3}>
                                    <Block>
                                        <Text size={theme.SIZES.FONT }>{title}</Text>
                                    </Block>
                                    <Block>
                                        <Text size={theme.SIZES.FONT * 0.7} muted>{caption}</Text>
                                    </Block>
                                </Block>
                            </Block>
                        </TouchableOpacity>
                    </Block>
                    <Block center style={styles.sideActions}>
                        <TouchableOpacity>
                            <Block>
                                <Icon name="arrow-bold-up" family="Entypo" size={theme.SIZES.BASE * 1.25}/>
                            </Block>
                        </TouchableOpacity>
                        <Block><Text>{updoots}</Text></Block>
                        <TouchableOpacity>
                            <Block><Icon name="arrow-bold-down" family="Entypo" size={theme.SIZES.BASE * 1.25}/></Block>
                        </TouchableOpacity>
                    </Block>
                </Block>
            </Block>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        width: width * 0.98,
        margin: width * 0.01,
        backgroundColor: theme.COLORS.WHITE

    },
    cardContent: {
        padding: theme.SIZES.BASE * 0.3
    },
    cardIcon: {
        // marginRight: theme.SIZES.BASE
        padding: theme.SIZES.BASE * 0.5 ,
        // backgroundColor: theme.COLORS.PRIMARY
    },
    contentArea: {
        // backgroundColor: theme.COLORS.PAPER
    },
    sideActions: {
        marginRight: theme.SIZES.BASE * 0.5
    }
})


