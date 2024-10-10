import QueryBuilder from '../../builder/QueryBuilder';
import { IPost } from './post.interface';
import { Post } from './post.model';

const createPost = async (post: IPost) => {
    return await Post.create(post);
};

const findPostById = async (postId: string) => {
    return await Post.findById(postId).populate('author').populate('comments');
};

const getAllPosts = async (query: Record<string, unknown>) => {
    const postQuery = new QueryBuilder(Post.find().populate('author').populate('comments'), query)
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await postQuery.modelQuery;
    const metaData = await postQuery.countTotal();
    return {
        meta: metaData,
        data: result,
    };
};

const updatePostById = async (postId: string, payload: Partial<IPost>) => {
    const result = await Post.findByIdAndUpdate({ _id: postId }, payload, {
        new: true,
        runValidators: true,
    });
    return result;
};

const deletePostById = async (postId: string) => {
    const result = await Post.findByIdAndDelete(postId);
    return result;
};

export const PostService = {
    createPost,
    findPostById,
    getAllPosts,
    updatePostById,
    deletePostById,
};
