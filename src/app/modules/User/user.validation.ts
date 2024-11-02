import { z } from 'zod';

// Create User validation schema
export const createUserValidationSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format').nonempty('Email is required'),
    password: z.string().optional(),
    name: z.string().nonempty('Name is required'),
    img: z.string().url('Invalid URL').optional(), // Optional URL validation
    mobileNumber: z.string().optional(),
    role: z.enum(['user', 'admin']).optional(),
    status: z.enum(['normal', 'premium']).optional(),
    followers: z.array(z.string()).optional(), // Array of follower IDs (strings)
    following: z.array(z.string()).optional(), // Array of following IDs (strings)
    posts: z.array(z.string()).optional(), // Array of post IDs (strings)
    purchasedContent: z.array(z.string()).optional(), // Array of post IDs (strings)
  }),
});


// Update User validation schema
export const updateUserValidationSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format').optional(),
    password: z.string().optional(),
    name: z.string().optional(),
    img: z.string().url('Invalid URL').optional(),
    mobileNumber: z.string().optional(),
    role: z.enum(['user', 'admin']).optional(),
    status: z.enum(['normal', 'premium']).optional(),
    followers: z.array(z.string()).optional(), // Array of follower IDs (optional)
    following: z.array(z.string()).optional(), // Array of following IDs (optional)
    posts: z.array(z.string()).optional(), // Array of post IDs (optional)
  }),
});

export const UserValidations = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
