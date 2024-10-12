/* eslint-disable @typescript-eslint/no-unused-vars */

import mongoose from 'mongoose';
import { Post } from '../Post/post.model';
import { Vote } from './vote.model';

const createUpVote = async (userId: string, postId: string) => {
    // Check if the user has already upvoted on this post
    const existingVote = await Vote.findOne({ user: userId, post: postId });

    if (existingVote) {
        if (existingVote.voteType === 'Upvote') {
            throw new Error('Already upvoted');
        } else {
            // If it's a downvote, just update it to upvote
            existingVote.voteType = 'Upvote';
            await existingVote.save();

            // Update the post: Increment upvotes by 1
            await Post.findByIdAndUpdate(postId, { $inc: { upvotes: 1 } });
        }
    } else {
        // Create a new upvote
        const newVote = new Vote({
            user: new mongoose.Types.ObjectId(userId),
            post: new mongoose.Types.ObjectId(postId),
            voteType: 'Upvote',
        });
        await newVote.save();

        // Increment upvotes by 1
        await Post.findByIdAndUpdate(postId, { $inc: { upvotes: 1 } });
    }
};



const createDownVote = async (userId: string, postId: string) => {
    // Check if the user has already downvoted this post
    const existingVote = await Vote.findOne({ user: userId, post: postId });

    if (existingVote) {
        if (existingVote.voteType === 'Downvote') {
            throw new Error('Already downvoted');
        } else {
            // If it's an upvote, change it to a downvote
            existingVote.voteType = 'Downvote';
            await existingVote.save();

            // Update the post: Increment downvotes by 1
            await Post.findByIdAndUpdate(postId, { $inc: { downvotes: 1 } });
        }
    } else {
        // Create a new downvote
        const newVote = new Vote({
            user: new mongoose.Types.ObjectId(userId),
            post: new mongoose.Types.ObjectId(postId),
            voteType: 'Downvote',
        });
        await newVote.save();

        // Increment downvotes by 1
        await Post.findByIdAndUpdate(postId, { $inc: { downvotes: 1 } });
    }
};

const getTotalUpvotes = async (postId: string): Promise<number> => {
    try {
        const post = await Post.findById(postId);

        if (!post) {
            throw new Error('Post not found');
        }

        return post.upvotes;
    } catch (error) {
        throw new Error('Could not retrieve the total number of downvotes');
    }
};


const getTotalDownvotes = async (postId: string): Promise<number> => {
    try {
        const post = await Post.findById(postId);

        if (!post) {
            throw new Error('Post not found');
        }

        return post.downvotes;
    } catch (error) {
        throw new Error('Could not retrieve the total number of downvotes');
    }
};


export const voteService = {
    createUpVote,
    createDownVote,
    getTotalUpvotes,
    getTotalDownvotes
};