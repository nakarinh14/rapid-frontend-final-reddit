import React, {useState} from 'react';
import {Comment} from "./Comment";
import {TouchableOpacity} from "react-native";

export const CommentTree = ({ comment, depth, path='', visibility }) => {

    const newDepth = depth+1
    const [hide, setHide] = useState(false)

    const displayCss = visibility  ? 'none' : undefined
    if(comment){
        const childrenComment = comment.comments;
        return (
            <>
                <TouchableOpacity
                    onPress={() => setHide(!hide)}
                    style={{flexDirection: "row", alignItems: 'center', justifyContent: 'flex-end', display: displayCss}}
                >
                    <Comment comment={{...comment.comment, id: comment.id}} depth={depth} path={path} hide={hide}/>
                </TouchableOpacity>
                {
                    childrenComment && Object.keys(childrenComment).map((child_id) =>
                        <CommentTree
                            visibility={visibility || hide}
                            key={`child-${depth}-${child_id}`}
                            comment={childrenComment[child_id]}
                            depth={newDepth}
                            path={`${path}/${child_id}`}
                        />
                    )
                }
            </>
        )
    }
    return null
}
