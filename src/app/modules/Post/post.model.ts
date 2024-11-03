/* eslint-disable no-useless-escape */
// models/Post.ts
import mongoose, { Schema } from 'mongoose';
import { IPost } from './post.interface';

const postSchema: Schema<IPost> = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    postImage: { type: String, required: true },
    content: { type: String, required: true }, // Rich text or markdown content
    category: { type: String, enum: ['tip', 'story'], required: true }, // Tip or Story
    isPremium: { type: Boolean, default: false }, // For premium content
    images: [String], // Array of image URLs
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

export const Post = mongoose.model<IPost>('Post', postSchema);
