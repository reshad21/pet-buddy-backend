import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../User/user.utils';
import { RentController } from './rent.controller';
import {
  createRentValidationSchema,
  updateRentValidationSchema,
} from './rent.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(createRentValidationSchema),
  RentController.createRent,
);

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.user),
  RentController.getAllRents,
);

router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  RentController.findRentById,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(updateRentValidationSchema),
  RentController.updateRentById,
);

router.delete('/:id', auth(USER_ROLE.admin, USER_ROLE.user), RentController.deleteRentById);

export const RentRoutes = router;
