/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';

import bcryptJs from 'bcryptjs';
import { JwtPayload } from 'jsonwebtoken';
import { sendEmail } from '../../utils/sendEmail';
import { User } from '../User/user.model';
import { USER_ROLE } from '../User/user.utils';
import { TLoginUser } from './auth.interface';
import { createToken, verifyToken } from './auth.utils';

const loginUser = async (payload: TLoginUser) => {
  // checking if the user exists
  const user = await User.findOne({ email: payload.email });
  // console.log("login user information from db--->", user);

  if (!user) {
    throw new Error('User does not exist');
  }

  const isPasswordMatch = await bcryptJs.compare(payload.password, user?.password);

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'password is incorrect');
  }

  const jwtPayload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    password: user.password,
    mobileNumber: user.mobileNumber,
    img: user.img,
    role: user.role,
    status: user.status,
    followers: user.followers,
    following: user.following,
    posts: user.posts,
    __v: user.__v,
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

const registerUser = async (userData: TLoginUser) => {
  if (userData.password) {
    userData.password = await bcryptJs.hash(
      userData.password,
      Number(config.bcrypt_salt_rounds),
    );
  }
  const user = await User.create({
    ...userData,
    role: USER_ROLE.user,
  });

  //create token and sent to the  client

  const jwtPayload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    mobileNumber: user.mobileNumber,
    role: user.role,
    status: user.status,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const changePassword = async (payload: { oldPassword: string, newPassword: string }, userData: JwtPayload) => {

  // step 1: checking if the user exists
  const user = await User.findById(userData._id);
  if (!user) {
    throw new Error('User does not exist');
  }
  // Step 2: Check if the provided old password matches the stored password
  const isPasswordMatch = await bcryptJs.compare(payload.oldPassword, user?.password);

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Old password is incorrect');
  }
  // Step 3: Hash the new password
  const hashedNewPassword = await bcryptJs.hash(payload.newPassword, Number(config.bcrypt_salt_rounds));

  await User.findOneAndUpdate({
    _id: user._id,
    role: user.role,
  },
    {
      password: hashedNewPassword,
      //  needPasswordChange:false,
      passwordChangedAt: new Date()
    }
  );

  return null;
}


const forgetPassword = async (userEmail: string) => {
  // checking if the user exists
  const user = await User.findOne({ email: userEmail });

  if (!user) {
    throw new Error('User does not exist');
  }

  const jwtPayload = {
    _id: user._id,
    email: user.email,
    password: user.password,
    role: user.role,
  };

  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '20m'
  );


  const resetUILink = `${config.reset_password_ui_link}?email=${user.email}&token=${resetToken}`;


  sendEmail(user.email, resetUILink);

}

const resetPassword = async (payload: { email: string, newPassword: string }, token: any) => {
  console.log("--->", payload);
  console.log("--->", token);
  // checking if the user exists
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw new Error('User does not exist');
  }

  // checking if the given token is valid
  const decoded = verifyToken(token, config.jwt_access_secret as string);

  console.log("decoded for reset services--->", decoded);

  if (payload.email !== decoded.email) {
    throw new AppError(httpStatus.FORBIDDEN, "You are forbidden")
  }


  const hashedNewPassword = await bcryptJs.hash(payload.newPassword, Number(config.bcrypt_salt_rounds));

  await User.findOneAndUpdate({
    _id: decoded._id,
    role: decoded.role,
  },
    {
      password: hashedNewPassword,
      passwordChangedAt: new Date()
    }
  );

}



export const AuthServices = {
  loginUser,
  refreshToken,
  registerUser,
  changePassword,
  forgetPassword,
  resetPassword
};
