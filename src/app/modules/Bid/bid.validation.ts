import { z } from 'zod';

export const createBidValidationSchema = z.object({
  body: z.object({
    rentId: z.string(), // Assuming rentId is represented by a string (e.g., rent ID)
    bids: z.array(
      z.object({
        driverId: z.string(), // Assuming driverId is represented by a string (e.g., driver ID)
        bidAmount: z.number(),
        bidStatus: z.enum(['accepted', 'pending', 'rejected']),
        driverLocation: z.string(),
      }),
    ),
  }),
});

export const updateBidValidationSchema = z.object({
  body: z.object({
    rentId: z.string().optional(),
    bids: z
      .array(
        z.object({
          driverId: z.string().optional(),
          bidAmount: z.number().optional(),
          bidStatus: z.enum(['accepted', 'pending', 'rejected']).optional(),
          driverLocation: z.string().optional(),
        }),
      )
      .optional(),
  }),
});

export const BidValidations = {
  createBidValidationSchema,
  updateBidValidationSchema,
};
