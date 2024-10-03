import { z } from 'zod';

// Create User validation schema
export const commentValidationSchema = z.object({
    body: z.object({
        content: z.string(),
    }),
});