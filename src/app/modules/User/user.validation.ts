import { z } from 'zod';

// Create User validation schema
export const createUserValidationSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format').nonempty('Email is required'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    name: z.string().nonempty('Name is required'),
    profilePicture: z.string().url('Invalid URL').optional(), // Optional URL validation
    role: z.enum(['user', 'admin'], { required_error: 'Role is required' }), // Must be 'user' or 'admin'
    followers: z.array(z.string()).optional(), // Array of follower IDs (strings)
    following: z.array(z.string()).optional(), // Array of following IDs (strings)
    posts: z.array(z.string()).optional(), // Array of post IDs (strings)
  }),
});


// Update User validation schema
export const updateUserValidationSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format').optional(),
    password: z.string().min(6, 'Password must be at least 6 characters long').optional(),
    name: z.string().optional(),
    profilePicture: z.string().url('Invalid URL').optional(),
    role: z.enum(['user', 'admin']).optional(),
    followers: z.array(z.string()).optional(), // Array of follower IDs (optional)
    following: z.array(z.string()).optional(), // Array of following IDs (optional)
    posts: z.array(z.string()).optional(), // Array of post IDs (optional)
  }),
});

export const UserValidations = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
