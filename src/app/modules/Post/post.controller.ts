import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PostService } from './post.service';

const createPost = catchAsync(async (req, res) => {
    const result = await PostService.createPost(req.body, req.user);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Post is created successfully',
        data: result,
    });
});

const findPostById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await PostService.findPostById(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Post is retrieved successfully',
        data: result,
    });
});

const getAllPosts = catchAsync(async (req, res) => {
    const result = await PostService.getAllPosts(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Posts are retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
});

const updatePostById = catchAsync(async (req, res) => {
    const id = req.params.postId;
    const result = await PostService.updatePostById(req.body, id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Post is updated successfully',
        data: result,
    });
});

const deletePostById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await PostService.deletePostById(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Post is deleted successfully',
        data: result && null,
    });
});

export const PostController = {
    createPost,
    findPostById,
    getAllPosts,
    updatePostById,
    deletePostById,
};
