import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { voteService } from './vote.service';


const upVote = catchAsync(async (req, res) => {
    const { postId } = req.params;
    const userId = req.user._id;
    const result = await voteService.createUpVote(userId, postId);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Upvote is created successfully',
        data: result,
    });
});

const downVote = catchAsync(async (req, res) => {
    const { postId } = req.params;
    const userId = req.user._id;
    const result = await voteService.createDownVote(userId, postId);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Downvote is created successfully',
        data: result,
    });
});



export const VoteController = {
    upVote,
    downVote,
};