import React from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Platform,
    Button,
    TouchableOpacity
} from "react-native";
import Modal from "react-native-modal";
import {Icon, NavBar} from "galio-framework";
import theme from "../theme";


export const ReplyTextModal = ({isModalVisible, closeModal, currentText, setCurrentText, children}) => {

    const resetText = () => {
        setCurrentText("")
    }

    return (
        <Modal
            isVisible={isModalVisible}
            swipeDirection={['up', 'down']}
            onSwipeComplete={closeModal}
            animationInTiming={200}
            animationOutTiming={200}
            onModalHide={resetText}
            avoidKeyboard={true}
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
                {children}
            </View>
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
