import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';

import { User } from '../User/user.model';
import { TLoginUser } from './auth.interface';
import { createToken, verifyToken } from './auth.utils';
import { IUser } from '../User/user.interface';
import { USER_ROLE } from '../User/user.utils';
import bcryptJs from 'bcryptjs';

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted

  const isPasswordMatched = bcryptJs.compare(payload.password, user.password);
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.NOT_FOUND, 'Password Incorrect!');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);

  const { email } = decoded;

  // checking if the user is exist
  const user = await User.findOne({ email: email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

const registerUser = async (userData: IUser) => {
  userData.password = await bcryptJs.hash(
    userData.password,
    Number(config.bcrypt_salt_rounds),
  );
  const user = await User.create({
    ...userData,
    role: USER_ROLE.user,
  });

  delete (user as Partial<IUser>).password;

  return user;
};
export const AuthServices = {
  loginUser,
  refreshToken,
  registerUser,
};
