import { Types } from 'mongoose';

export interface IBid {
  rentId: Types.ObjectId;
  bid: {
    driverId: Types.ObjectId;
    bidAmount: number;
    bidStatus: 'accepted' | 'pending' | 'rejected';
    driverLocation: string;
  };
}
