import { z } from 'zod';

// Create Vote validation schema
export const createVoteValidationSchema = z.object({
    body: z.object({
        user: z.string(), // Validate user as a non-empty string (user ID)
        post: z.string(), // Validate post as a non-empty string (post ID)
        voteType: z.enum(['Upvote', 'Downvote'], { required_error: 'Vote type is required' }), // Must be either 'Upvote' or 'Downvote'
    }),
});

// Update Vote validation schema
export const updateVoteValidationSchema = z.object({
    body: z.object({
        user: z.string().optional(), // User ID can be optional for updates
        post: z.string().optional(), // Post ID can be optional for updates
        voteType: z.enum(['Upvote', 'Downvote']).optional(), // Vote type can be optional for updates
    }),
});
