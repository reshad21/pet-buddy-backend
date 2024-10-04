import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Post } from "../Post/post.model";
import { IComment } from "./comment.interface";
import { Comment } from "./comment.model";

const createCommentIntoDB = async (comment: IComment, postId: string) => {
    try {
        // Find the post by postId
        const post = await Post.findById(postId);

        if (!post) {
            throw new Error('Post not found');
        }

        // Create the new comment
        const newComment = await Comment.create(comment);

        // Add the comment's _id to the post's comments array
        post.comments.push(newComment._id);

        // Save the updated post
        await post.save();

        return newComment;
    } catch (error) {
        throw new AppError(httpStatus.FORBIDDEN, "Could not create comment");
    }
};

export const CommentService = {
    createCommentIntoDB,
};
