import QueryBuilder from '../../builder/QueryBuilder';
import { IVote } from './vote.interface';
import { Vote } from './vote.model';

// Create a new vote
const createVoteIntoDB = async (vote: IVote) => {
    return await Vote.create(vote);
};

// Find a vote by its ID
const findVoteByIdIntoDB = async (voteId: string) => {
    return await Vote.findById(voteId)
        .populate('user', 'name email') // Populate user details
        .populate('post'); // Populate post details
};

// Get all votes with query filtering, sorting, and pagination
const getAllVotesFromDB = async (query: Record<string, unknown>) => {
    const voteQuery = new QueryBuilder(Vote.find(), query)
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await voteQuery.modelQuery;
    const metaData = await voteQuery.countTotal();
    return {
        meta: metaData,
        data: result,
    };
};

// Update a vote by its ID
const updateVoteByIdIntoDB = async (voteId: string, payload: Partial<IVote>) => {
    const result = await Vote.findByIdAndUpdate({ _id: voteId }, payload, {
        new: true,
        runValidators: true,
    });
    return result;
};

// // Delete a vote by its ID
// const deleteVoteById = async (voteId: string) => {
//     const result = await Vote.findByIdAndDelete(voteId);
//     return result;
// };

// Export all vote services
export const VoteService = {
    createVoteIntoDB,
    findVoteByIdIntoDB,
    getAllVotesFromDB,
    updateVoteByIdIntoDB,
    // deleteVoteById,
};
