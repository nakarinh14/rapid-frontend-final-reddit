import React, {useState} from 'react';
import {Comment} from "./Comment";
import {ReplyTextModal} from "./ReplyTextModal";

const comment = {
    user: "a",
    timestamp: "1mo",
    body: "[PURCHASE guide] 2020, ASK ANYTHING!",
    upvotes: 50
}

export const ReplyModal = ({isModalVisible, closeModal, replyType}) => {
    const [currentText, setCurrentText] = useState("")

    return (
        <ReplyTextModal
            isModalVisible={isModalVisible}
            closeModal={closeModal}
            currentText={currentText}
            setCurrentText={setCurrentText}
        >
            {replyType === "comment" && (<Comment preview={true} comment={comment}/>)}
        </ReplyTextModal>
    )
}
