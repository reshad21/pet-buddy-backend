import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CommentService } from './comment.service';


const createComment = catchAsync(async (req, res) => {
    const { postId } = req.params;
    const result = await CommentService.createCommentIntoDB(req.body, postId);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Comment is created successfully',
        data: result,
    });
});

export const CommentController = {
    createComment,
};