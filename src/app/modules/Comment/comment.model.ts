import mongoose, { Schema } from 'mongoose';
import { IComment } from './comment.interface';



// Define the Comment schema
const commentSchema: Schema<IComment> = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    replies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment', // Reference to nested comments (replies)
        },
    ],
});

// Export the Comment model
export const Comment = mongoose.model<IComment>('Comment', commentSchema);
