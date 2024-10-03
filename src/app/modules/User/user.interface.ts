import { Types } from 'mongoose';


// Define IUser interface for type safety
export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  profilePicture?: string;
  role: 'user' | 'admin';
  followers?: Types.ObjectId[];
  following?: Types.ObjectId[];
  posts?: Types.ObjectId[];
}
