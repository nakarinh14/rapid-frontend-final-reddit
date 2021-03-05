import React, {useState} from 'react';
import {
    KeyboardAvoidingView,
    StyleSheet,
    TextInput,
    View,
    Platform,
    Button,
    TouchableOpacity
} from "react-native";
import Modal from "react-native-modal";
import {Comment} from "./Comment";
import {Icon, NavBar} from "galio-framework";
import theme from "../theme";

const comment = {
    user: "a",
    timestamp: "1mo",
    body: "[PURCHASE guide] 2020, ASK ANYTHING!",
    upvotes: 50
}

export const ReplyTextArea = ({isModalVisible, closeModal}) => {
    const [currentText, setCurrentText] = useState("")

    const resetText = () => {
        setCurrentText("")
    }

    return (
        <Modal
            isVisible={isModalVisible}
            swipeDirection={['up', 'left', 'right', 'down']}
            onSwipeComplete={closeModal}
            animationInTiming={200}
            animationOutTiming={200}
            onModalHide={resetText}
        >
            <KeyboardAvoidingView
                behavior="position"
                enabled
            >
                <NavBar
                    title={"New Comment"}
                    left={(
                        <TouchableOpacity onPress={closeModal}>
                            <Icon
                                name="close"
                                family="Ionicons"
                                size={20}
                                color={theme.COLORS.IOS}
                            />
                        </TouchableOpacity>
                    )}
                    right={(<Button title={"Post"} onPress={closeModal}/>)}
                    style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null}
                />
                <View style={styles.content}>
                    <TextInput
                        multiline={true}
                        numberOfLines={10}
                        onChangeText={(text) => setCurrentText(text)}
                        value={currentText}
                        placeholder='Add a Comment'
                        style={{marginBottom: 50}}
                    />
                    <Comment preview={true} comment={comment}/>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    view: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    content: {
        backgroundColor: 'white',
        padding: 22,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
    },
    contentText: {
        fontSize: 20,
        marginBottom: 12,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: "flex-end",
        backgroundColor: 'white',
    }

});
