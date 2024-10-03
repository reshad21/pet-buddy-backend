import { IComment } from "./comment.interface";
import { Comment } from "./comment.model";

const createCommentIntoDB = async (comment: IComment) => {
    return await Comment.create(comment);
};

export const CommentService = {
    createCommentIntoDB,
};