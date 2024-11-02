/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { readFileSync } from "fs";
import { Types } from "mongoose";
import { join } from "path";
import orderModel from "../order/order.model";
import { User } from "../User/user.model";
import { verifyPayment } from "./payment.utils";

const confirmationService = async (transactionId: string, status: string) => {
    const verifyResponse = await verifyPayment(transactionId);
    let result;
    let message = "";

    if (verifyResponse && verifyResponse.pay_status === "Successful") {
        result = await orderModel.findOneAndUpdate(
            { transactionId },
            { paymentStatus: "Paid" },
            { new: true } // Ensure you get the updated document back
        );

        if (!result) {
            throw new Error('Order not found');
        }

        message = "Successfully Paid!";
        console.log("Result from order update -->", result.products);

        // Ensure result.products is defined and is an array
        if (result.products && Array.isArray(result.products)) {
            const user = await User.findOne({
                $or: [
                    { name: result.user.name },
                    { email: result.user.email },
                    { mobileNumber: result.user.mobileNumber }
                ]
            });

            if (user) {
                console.log("User found successfully -->", user);

                // Initialize purchasedContent if undefined
                if (!user.purchasedContent) user.purchasedContent = [];

                // Ensure each product in result.products is in purchasedContent
                result.products.forEach((product) => {
                    const productId = product.product as unknown as Types.ObjectId; // Ensure productId is of type ObjectId
                    const productIdString = productId.toString();
                    const postExists = user.purchasedContent?.some(
                        (post) => post._id.toString() === productIdString
                    );

                    if (!postExists) {
                        // Add the post if it doesn't exist in purchasedContent
                        user.purchasedContent?.push({
                            _id: productId, // Directly use productId of type ObjectId
                            isPremium: false, // Set initial isPremium to false
                        });
                    }
                });

                // Save the updated user document
                await user.save();
                console.log("Updated user purchasedContent:", user.purchasedContent);
            }
        }
    } else {
        message = "Payment Failed!";
    }

    const filePath = join(__dirname, "../../../views/confirmation.html");
    let template = readFileSync(filePath, "utf-8");
    template = template.replace("{{message}}", message);

    return template;
};

export const paymentServices = {
    confirmationService
};
