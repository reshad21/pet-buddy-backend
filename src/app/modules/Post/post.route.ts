import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../User/user.utils';
import { PostController } from './post.controller';
import {
    createPostValidationSchema,
    updatePostValidationSchema,
} from './post.validation';

const router = express.Router();

// Create a new post (User only)
router.post(
    '/',
    auth(USER_ROLE.user),
    validateRequest(createPostValidationSchema),
    PostController.createPost,
);

// Get all posts (Both Admin and User)
router.get(
    '/',
    // auth(USER_ROLE.admin, USER_ROLE.user),
    PostController.getAllPosts,
);

// Get a specific post by ID (Both Admin and User)
router.get(
    '/:id',
    // auth(USER_ROLE.admin, USER_ROLE.user),
    PostController.findPostById,
);

// Update a post by ID (User and Admin)
router.patch(
    '/:id',
    auth(USER_ROLE.admin, USER_ROLE.user),
    validateRequest(updatePostValidationSchema),
    PostController.updatePostById,
);

// Delete a post by ID (Admin only)
router.delete(
    '/:id',
    auth(USER_ROLE.admin, USER_ROLE.user),
    PostController.deletePostById,
);

export const PostRoutes = router;
