import bcryptJs from 'bcryptjs';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import config from '../../config';
import { Post } from '../Post/post.model';
import { UserSearchableFields } from './user.constant';
import { IUser } from './user.interface';
import { User } from './user.model';

const createUser = async (user: IUser) => {
  user.password = await bcryptJs.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  return await User.create(user);
};

const findUserById = async (userId: string) => {
  return await User.findById(userId);
};

const getAllUsers = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find(), query)
    .search(UserSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await userQuery.modelQuery;
  const metaData = await userQuery.countTotal();
  return {
    meta: metaData,
    data: result,
  };
};

const updateUserById = async (userId: string, payload: Partial<IUser>) => {
  const result = await User.findByIdAndUpdate({ _id: userId }, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteUserById = async (userId: string) => {
  const result = await User.findByIdAndDelete(userId);
  return result;
};


const getSingleUserAllPost = async (userId: string) => {
  const result = await Post.find({
    author: new mongoose.Types.ObjectId(userId)
  });

  return result;
};


// Follow a User
const followUserIntoBd = async (userId: string, followId: string) => {
  console.log("user id==>", userId, "who follow the user==>", followId);
  try {

    const user = await User.findById(userId);
    const userToFollow = await User.findById(followId);

    if (!userToFollow) {
      throw new Error("User to follow not found");
    }

    // Check if already following
    if (user?.following?.includes(userToFollow._id)) {
      throw new Error("You are already following this user");
    }

    // Add to following and followers lists
    user?.following?.push(userToFollow._id);
    userToFollow.followers?.push(user!._id);

    // Save changes directly
    await user?.save();
    await userToFollow.save();

    return { message: "User followed successfully" };
  } catch (error) {
    console.error("Error in followUserIntoBd:", error);
    throw new Error("Failed to create follow");
  }
};


// Unfollow a User
const unfollowUserIntoDb = async (userId: string, unfollowId: string) => {
  const user = await User.findById(userId);
  const userToUnfollow = await User.findById(unfollowId);

  if (!userToUnfollow) {
    throw new Error("User to unfollow not found");
  }

  // Check if not following
  if (!user?.following?.includes(userToUnfollow._id)) {
    throw new Error("You are not following this user");
  }

  // Remove from following and followers lists
  user.following = user.following?.filter(
    (id) => id.toString() !== unfollowId,
  );
  userToUnfollow.followers = userToUnfollow.followers?.filter(
    (id) => id.toString() !== userId,
  );

  // Save changes directly
  await user.save();
  await userToUnfollow.save();

  return { message: "User unfollowed successfully" };
};


export const UserService = {
  createUser,
  findUserById,
  getAllUsers,
  updateUserById,
  deleteUserById,
  getSingleUserAllPost,
  followUserIntoBd,
  unfollowUserIntoDb
};
