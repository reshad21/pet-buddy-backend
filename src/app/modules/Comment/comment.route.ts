import express from 'express';
import auth from '../../middlewares/auth';
// import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../User/user.utils';
import { CommentController } from './comment.controller';
// import { commentValidationSchema } from './comment.validation';

const router = express.Router();

// Create a new post (User only)
router.post(
    '/:postId',
    auth(USER_ROLE.user, USER_ROLE.admin),
    // validateRequest(commentValidationSchema),
    CommentController.createComment
);

router.get(
    '/:postId',
    CommentController.getComment
);




export const CommentRoutes = router;
