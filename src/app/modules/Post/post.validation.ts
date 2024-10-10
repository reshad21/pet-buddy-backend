import { z } from 'zod';

export const createPostValidationSchema = z.object({
    body: z.object({
        author: z.string(), // Assuming author is represented by a string (e.g., user ID)
        title: z.string().min(1, 'Title is required'), // Title must not be empty
        postImage: z.string(), // Title must not be empty
        content: z.string().min(1, 'Content is required'), // Content must not be empty
        category: z.enum(['Tip', 'Story'], { required_error: 'Category is required' }), // Category must be either "Tip" or "Story"
        isPremium: z.boolean().optional(), // Premium content is optional
        images: z.array(z.string()).optional(), // Array of image URLs is optional
    }),
});

export const updatePostValidationSchema = z.object({
    body: z.object({
        author: z.string().optional(), // Assuming author is represented by a string (e.g., user ID)
        title: z.string().optional(),
        postImage: z.string(),
        content: z.string().optional(), // Can be rich text or markdown
        category: z.enum(['Tip', 'Story']).optional(),
        isPremium: z.boolean().optional(),
        images: z.array(z.string()).optional(), // Array of image URLs
        upvotes: z.number().optional(),
        downvotes: z.number().optional(),
    }),
});