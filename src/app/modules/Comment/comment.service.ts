/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status"; // HTTP status codes
import AppError from "../../errors/AppError"; // Custom error handling
import { Post } from "../Post/post.model"; // Import the Post model
import { IComment } from "./comment.interface"; // Import the IComment interface
import { Comment } from "./comment.model"; // Import the Comment model

/**
 * Creates a comment in the database and associates it with a post.
 * @param comment - The comment data to be created.
 * @param postId - The ID of the post to which the comment belongs.
 * @returns The populated comment object after creation.
 * @throws AppError if the post is not found or if comment creation fails.
 */
const createCommentIntoDB = async (comment: IComment, postId: string) => {
    try {
        // Find the post by postId
        const post = await Post.findById(postId);

        // Check if the post exists
        if (!post) {
            throw new AppError(httpStatus.NOT_FOUND, 'Post not found');
        }

        // Create the new comment
        const newComment = await Comment.create(comment);
        console.log("New comment created:", newComment); // Log the newly created comment

        // Add the comment's ID to the post's comments array
        post.comments.push(newComment._id);

        // Save the updated post
        await post.save();
        console.log("Post updated with new comment:", post); // Log the updated post

        // Populate the author and post fields with details
        const populatedComment = await Comment.findById(newComment._id)
            .populate('author', 'name email img') // Populate author with selected fields
            .populate('post', 'title'); // Populate post with selected fields

        return populatedComment; // Return the populated comment
    } catch (error) {
        console.error("Error creating comment:", error); // Log the actual error
        throw new AppError(httpStatus.FORBIDDEN, "Could not create comment"); // Throw a custom error
    }
};


const getComment = async (postId: string) => {
    try {
        const comment = await Comment.find({ post: postId });
        return comment;
    } catch (error) {
        throw new Error('Could not retrieve the total number of comments');
    }
};

export const CommentService = {
    createCommentIntoDB,getComment
};
