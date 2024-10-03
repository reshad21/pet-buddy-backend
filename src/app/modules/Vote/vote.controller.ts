import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { VoteService } from './vote.service';

// Controller to create a new vote
const createVote = catchAsync(async (req, res) => {
    const result = await VoteService.createVoteIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Vote is created successfully',
        data: result,
    });
});

// Controller to find a vote by its ID
const findVoteById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await VoteService.findVoteByIdIntoDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Vote is retrieved successfully',
        data: result,
    });
});

// Controller to get all votes with query filters
const getAllVotes = catchAsync(async (req, res) => {
    const result = await VoteService.getAllVotesFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Votes are retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
});

// Controller to update a vote by its ID
const updateVoteById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await VoteService.updateVoteByIdIntoDB(id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Vote is updated successfully',
        data: result,
    });
});

// Controller to delete a vote by its ID
// const deleteVoteById = catchAsync(async (req, res) => {
//     const { id } = req.params;
//     const result = await VoteService.deleteVoteById(id);

//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: 'Vote is deleted successfully',
//         data: result && null,
//     });
// });

// Export VoteController
export const VoteController = {
    createVote,
    findVoteById,
    getAllVotes,
    updateVoteById,
    // deleteVoteById,
};
