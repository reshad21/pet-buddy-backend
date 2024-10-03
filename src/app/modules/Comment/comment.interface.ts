import { Types } from 'mongoose';

export interface IComment extends Document {
    post: Types.ObjectId;
    author: Types.ObjectId;
    content: string;
    replies?: Types.ObjectId[];
}