import React from 'react';

import {Comment} from "./Comment";

export const CommentTree = ({ comment, depth, path='' }) => {

    const newDepth = depth+1

    if(comment){
        const childrenComment = comment.comments;
        return (
            <>
                <Comment comment={comment} depth={depth} path={path} />
                {
                    childrenComment && Object.keys(childrenComment).map((child_id) =>
                        <CommentTree
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
