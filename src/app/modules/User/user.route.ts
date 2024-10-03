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

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(createUserValidationSchema),
  UserController.createUser,
);

router.get('/', auth(USER_ROLE.admin), UserController.getAllUsers);

router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserController.findUserById,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(updateUserValidationSchema),
  UserController.updateUserById,
);

router.delete('/:id', auth(USER_ROLE.admin), UserController.deleteUserById);

export const UserRoutes = router;
