/* eslint-disable @typescript-eslint/no-explicit-any */
import QueryBuilder from '../../builder/QueryBuilder';
import { User } from '../User/user.model';
import { IPost } from './post.interface';
import { Post } from './post.model';

const createPost = async (post: IPost, user: any) => {
    // Find the user by user._id
    const existingUser = await User.findById(user._id);

    if (!existingUser) {
        throw new Error("User not found");
    }

    // Initialize the posts array if it's undefined
    if (!existingUser.posts) {
        existingUser.posts = [];
    }

    // Create the post
    const createdPost = await Post.create(post);

    // Add the post's _id to the user's posts array
    existingUser.posts.push(createdPost._id);

    // Save the updated user
    await existingUser.save();

    return createdPost;
};


const findPostById = async (postId: string) => {
    return await Post.findById(postId).populate('author').populate('comments');
};

const getAllPosts = async (query: Record<string, unknown>) => {
    const postQuery = new QueryBuilder(Post.find().populate('author').populate('comments'), query)
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await postQuery.modelQuery;
    const metaData = await postQuery.countTotal();
    return {
        meta: metaData,
        data: result,
    };
};

const updatePostById = async (postId: string, payload: Partial<IPost>) => {
    const result = await Post.findByIdAndUpdate({ _id: postId }, payload, {
        new: true,
        runValidators: true,
    });
    return result;
};

const deletePostById = async (postId: string) => {
    const result = await Post.findByIdAndDelete(postId);
    return result;
};

export const PostService = {
    createPost,
    findPostById,
    getAllPosts,
    updatePostById,
    deletePostById,
};
