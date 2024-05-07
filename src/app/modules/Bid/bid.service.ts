import QueryBuilder from '../../builder/QueryBuilder';
import { IBid } from './bid.interface';
import { Bid } from './bid.model';

const createBid = async (bid: IBid) => {
  return await Bid.create(bid);
};

const findBidById = async (bidId: string) => {
  return await Bid.findById(bidId);
};

const getAllBids = async (query: Record<string, unknown>) => {
  const bidQuery = new QueryBuilder(Bid.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await bidQuery.modelQuery;
  const metaData = await bidQuery.countTotal();
  return {
    meta: metaData,
    data: result,
  };
};

const updateBidById = async (bidId: string, payload: Partial<IBid>) => {
  const result = await Bid.findByIdAndUpdate({ _id: bidId }, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteBidById = async (bidId: string) => {
  const result = await Bid.findByIdAndDelete(bidId);
  return result;
};

export const BidService = {
  createBid,
  findBidById,
  getAllBids,
  updateBidById,
  deleteBidById,
};
