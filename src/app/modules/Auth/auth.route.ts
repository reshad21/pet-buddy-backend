import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../User/user.utils';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

router.post(
  '/register',
  validateRequest(AuthValidation.registerUserValidationSchema),
  AuthControllers.registerUser,
);

router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

router.post(
  '/forget-password',
  validateRequest(AuthValidation.forgetPasswordValidationSchema),
  AuthControllers.forgetPassword,
);

router.post(
  '/reset-password',
  validateRequest(AuthValidation.resetPasswordValidationSchema),
  AuthControllers.resetPassword,
);

//http://localhost:3000?email=miakala7@gmail.com&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzA3YjE2MDlhYmYzZmE2MThhYWNlNjIiLCJlbWFpbCI6Im1pYWthbGE3QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJEE3LkRDbE1ObkV1MXRtakJPemI1VHU2SVJvbE42SXRuejk0UmRqOTB1YUJOdVN0U2FQa01tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MzAxNzk1NDQsImV4cCI6MTczMDE4MDc0NH0.gezrtbF5ZJ7ft8olWqQHvl_q3k9JVxFEI3Yybleh2zg

// router.get('/reset-password', (req, res) => {
//   const { email, token } = req.query;
//   res.render('reset-password', { email, token });
// });


export const AuthRoutes = router;
