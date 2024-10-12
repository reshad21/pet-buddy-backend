/* eslint-disable @typescript-eslint/no-unused-vars */
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
            throw new AppError(httpStatus.NOT_FOUND, 'Post not found');
        }

        // Create the new comment
        const newComment = await Comment.create(comment);

        // Add the comment's content to the post's comments array
        post.comments.push(newComment._id);

        // Save the updated post
        await post.save();

        // Populate the author and post fields with details
        const populatedComment = await Comment.findById(newComment._id)
            .populate('author', 'name email img') // Populate author with selected fields
            .populate('post', 'title'); // Populate post with selected fields

        return populatedComment;
    } catch (error) {
        throw new AppError(httpStatus.FORBIDDEN, "Could not create comment");
    }
};

export const CommentService = {
    createCommentIntoDB,
};
