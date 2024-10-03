import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../User/user.utils';
import { VoteController } from './vote.controller';
import { createVoteValidationSchema, updateVoteValidationSchema } from './vote.validations';


const router = express.Router();

// Create a new vote (User only)
router.post(
    '/',
    auth(USER_ROLE.user),
    validateRequest(createVoteValidationSchema),
    VoteController.createVote,
);

// Get all votes (Both Admin and User)
router.get(
    '/',
    auth(USER_ROLE.admin, USER_ROLE.user),
    VoteController.getAllVotes,
);

// Get a specific vote by ID (Both Admin and User)
router.get(
    '/:id',
    auth(USER_ROLE.admin, USER_ROLE.user),
    VoteController.findVoteById,
);

// Update a vote by ID (User and Admin)
router.patch(
    '/:id',
    auth(USER_ROLE.admin, USER_ROLE.user),
    validateRequest(updateVoteValidationSchema),
    VoteController.updateVoteById,
);

// Delete a vote by ID (Admin only)
// router.delete(
//     '/:id',
//     auth(USER_ROLE.admin),
//     VoteController.deleteVoteById,
// );

export const VoteRoutes = router;
