import { Types } from 'mongoose';


// Define IUser interface for type safety
export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  img?: string;
  role: 'user' | 'admin';
  status: 'normal' | 'premium';
  followers?: Types.ObjectId[];
  following?: Types.ObjectId[];
  posts?: Types.ObjectId[];
  passwordChangedAt?: Date;
  mobileNumber?: string;
}

