import React, { useState } from 'react';
import {ActivityIndicator, Dimensions, StyleSheet} from "react-native";
import theme from "../theme";
import {Block} from "galio-framework";
import {CommentTree} from "./CommentTree";
import CommentEllipsisModal from "./CommentEllipsisModal";
import CommentModalContext from "./CommentModalContext"
import {withInteractionsManaged} from "./withInteractionsManaged";

const { width } = Dimensions.get('screen');

const CommentSection = ({ comments })=> {

    const [isModalVisible, setModalVisible] = useState(false);
    const [previewCommentModal, setPreviewCommentModal] = useState(() => {})

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const closeModal = () => {
        setModalVisible(false)
    }
    const setPreviewComment = (message) => {
        setPreviewCommentModal(message)
        toggleModal()
    }

    return (
        <CommentModalContext.Provider value={setPreviewComment}>
            <Block flex style={styles.cards}>
                {comments && Object.keys(comments).map((comment_id) => {
                    const comment = comments[comment_id]
                    return (
                        <Block
                            key={`card-${comment_id}`}
                            flex
                            style={styles.card}
                        >
                           <CommentTree comment={comment} depth={0} />
                        </Block>
                    )}
                )}
            </Block>
            <CommentEllipsisModal
                previewCommentModal={previewCommentModal}
                isModalVisible={isModalVisible}
                closeModal={closeModal}
            />
        </CommentModalContext.Provider>
    )
}

const styles = StyleSheet.create({
    cards: {
        backgroundColor: theme.COLORS.PAPER,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        backgroundColor: theme.COLORS.WHITE,
        width,
        elevation: theme.SIZES.BASE / 2,
        marginVertical: 2.5,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
});

export default withInteractionsManaged(CommentSection, ActivityIndicator)
