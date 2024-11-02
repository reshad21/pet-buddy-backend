import { readFileSync } from "fs";
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
            { paymentStatus: "Paid" }
        );
        message = "Successfully Paid!";
        console.log("Result from order update -->", result?.user);
        // console.log("Result from order update -->", result.article);

        // Proceed only if `result` is found
        if (result) {
            // Assuming `result` contains relevant user identifiers
            const bookingDetails = await User.findOne({
                $or: [
                    { name: result?.user.name },
                    { email: result?.user.email },
                    { mobileNumber: result?.user.mobileNumber }
                ]
            });

            if (bookingDetails) {
                console.log("usr get successfully-->", bookingDetails);
                // Assuming `payBill` is a field in `User` schema
                // bookingDetails.payBill = true;
                // await bookingDetails.save(); // Save updated booking details
                // console.log("Booking details updated: ", bookingDetails);
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
