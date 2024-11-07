import { readFileSync } from "fs";
import { Types } from "mongoose";
import { join } from "path";
import orderModel from "../order/order.model";
import { Post } from "../Post/post.model";  // Assuming you have a Post model where `isPremium` is located
import { verifyPayment } from "./payment.utils";

const confirmationService = async (transactionId: string, status: string): Promise<string> => {
    const verifyResponse = await verifyPayment(transactionId);
    let result;
    let message = "";

    if (verifyResponse && verifyResponse.pay_status === "Successful") {
        // Update the order with payment status as "Paid"
        result = await orderModel.findOneAndUpdate(
            { transactionId },
            { paymentStatus: "Paid" },
            { new: true }
        );

        if (!result) {
            throw new Error('Order not found');
        }

        message = "Successfully Paid!";
        console.log("Result from order update -->", result.products);

        // Ensure result.products is defined and is an array
        if (result.products && Array.isArray(result.products)) {
            // Iterate over the products in the order
            for (const product of result.products) { 
                // Ensure product.product is treated as an ObjectId
                const productId = product.product instanceof Types.ObjectId
                    ? product.product // If it's already an ObjectId, use it
                    : new Types.ObjectId(product.product as unknown as string); // If it's not, create a new ObjectId

                // Update the 'isPremium' field in the Post model
                await Post.findOneAndUpdate(
                    { _id: productId },   // Find the post by productId
                    { isPremium: false },  // Update the isPremium field to false
                    { new: true }          // Return the updated document
                );
            }
        }
    } else {
        message = "Payment Failed!";
    }

    // Path to confirmation template file
    const filePath = join(__dirname, "../../../../public/confirmation.html");
    let template = readFileSync(filePath, "utf-8");
    template = template.replace("{{message}}", message);

    return template;
};

export const paymentServices = {
    confirmationService
};
