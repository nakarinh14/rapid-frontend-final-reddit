import React, {useState} from 'react';
import {Comment} from "./Comment";
import {TouchableOpacity} from "react-native";

export const CommentTree = ({ comment, depth, path='', visibility }) => {

    const newDepth = depth+1
    const [hide, setHide] = useState(false)

    if(comment){
        const childrenComment = comment.comments;
        return (
            <>
                <TouchableOpacity
                    onPress={() => setHide(!hide)}
                    style={{flexDirection: "row", alignItems: 'center', justifyContent: 'flex-end', display: undefined}}
                >
                    <Comment comment={{...comment.comment, id: comment.id}} depth={depth} path={path} hide={hide}/>
                </TouchableOpacity>
                {
                    !hide && childrenComment && Object.keys(childrenComment).map((child_id) =>
                        <CommentTree
                            visibility={hide}
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
