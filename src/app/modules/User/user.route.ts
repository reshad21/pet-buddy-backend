import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { USER_ROLE } from './user.utils';
import {
  createUserValidationSchema,
  updateUserValidationSchema,
} from './user.validation';

const router = express.Router();

//extra route
router.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(createUserValidationSchema),
  UserController.createUser,
);

router.get(
  '/',
  // auth(USER_ROLE.admin),
  UserController.getAllUsers
);

router.get(
  '/:id',
  // auth(USER_ROLE.admin, USER_ROLE.user),
  UserController.findUserById,
);

router.patch(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(updateUserValidationSchema),
  UserController.updateUserById,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  UserController.deleteUserById
);

router.get(
  '/posts/:id',
  UserController.singleUserAllPosts
);


router.post('/follow/:followId', auth(USER_ROLE.user), UserController.followUser);
router.post('/unfollow/:unfollowId', auth(USER_ROLE.user), UserController.unfollowUser);

export const UserRoutes = router;
