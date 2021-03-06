import React, {useState} from 'react';
import {Comment} from "./Comment";
import {ReplyTextModal} from "./ReplyTextModal";

export const ReplyCommentModal = ({isModalVisible, closeModal, comment, commentId}) => {
    const [currentText, setCurrentText] = useState("")

    return (
        <ReplyTextModal
            isModalVisible={isModalVisible}
            closeModal={closeModal}
            currentText={currentText}
            setCurrentText={setCurrentText}
        >
            {comment && (<Comment preview={true} comment={comment}/>)}
        </ReplyTextModal>
    )
}
