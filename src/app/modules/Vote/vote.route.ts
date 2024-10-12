import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../User/user.utils';
import { VoteController } from './vote.controller';
import { updateVoteValidationSchema } from './vote.validations';


const router = express.Router();

router.post(
    '/upvote/:postId',
    auth(USER_ROLE.admin, USER_ROLE.user),
    validateRequest(updateVoteValidationSchema),
    VoteController.upVote
);

router.get(
    '/upvote/:postId',
    VoteController.totalUpVote
);

router.post(
    '/downvote/:postId',
    auth(USER_ROLE.admin, USER_ROLE.user),
    validateRequest(updateVoteValidationSchema),
    VoteController.downVote
);


router.get(
    '/downvote/:postId',
    VoteController.totalDownVote
);




export const VoteRoutes = router;
