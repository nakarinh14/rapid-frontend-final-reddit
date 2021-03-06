import React, {useState} from 'react';
import {ReplyTextModal} from "./ReplyTextModal";

export const ReplyPostModal = ({isModalVisible, closeModal, postId}) => {
    const [currentText, setCurrentText] = useState("")

    return (
        <ReplyTextModal
            isModalVisible={isModalVisible}
            closeModal={closeModal}
            currentText={currentText}
            setCurrentText={setCurrentText}
        />
    )
}
