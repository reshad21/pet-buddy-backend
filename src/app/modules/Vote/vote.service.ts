
import mongoose from 'mongoose';
import { Post } from '../Post/post.model';
import { Vote } from './vote.model';

const createUpVote = async (userId: string, postId: string) => {
    // Check if the user has already voted on this post
    const existingVote = await Vote.findOne({ user: userId, post: postId });

    if (existingVote) {
        if (existingVote.voteType === 'Upvote') {
            throw new Error('Already upvoted');
        } else {
            // Change the vote from Downvote to Upvote
            existingVote.voteType = 'Upvote';
            await existingVote.save();

            // Update the post: Increment upvotes by 1, decrement downvotes by 1
            await Post.findByIdAndUpdate(postId, { $inc: { upvotes: 1, downvotes: -1 } });
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
    // Check if the user has already voted on this post
    const existingVote = await Vote.findOne({ user: userId, post: postId });

    if (existingVote) {
        if (existingVote.voteType === 'Downvote') {
            throw new Error('Already downvoted');
        } else {
            // Change the vote from Upvote to Downvote
            existingVote.voteType = 'Downvote';
            await existingVote.save();

            // Update the post: Increment downvotes by 1, decrement upvotes by 1
            await Post.findByIdAndUpdate(postId, { $inc: { downvotes: 1, upvotes: -1 } });
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



export const voteService = {
    createUpVote,
    createDownVote,
};