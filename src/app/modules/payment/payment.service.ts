import { readFileSync } from "fs";
import { join } from "path";
import orderModel from "../order/order.model";
import { verifyPayment } from "./payment.utils";

const confirmationService = async (transactionId: string, status: string) => {
    const verifyResponse = await verifyPayment(transactionId);
    // console.log(verifyResponse.pay_status);
    let result;
    let message = ""
    if (verifyResponse && verifyResponse.pay_status == 'Successful') {
        result = await orderModel.findOneAndUpdate({ transactionId }, {
            paymentStatus: "Paid"
        })
        message = "Successfully Paid!";
        //find and update
        if (result) {
            // const bookingDetails = await Booking.findById(result?.bookingID);
            // if (bookingDetails) {
            //     // Update payBill to true
            //     bookingDetails.payBill = true;
            //     await bookingDetails.save(); // Save the updated booking details
            //     console.log("Booking details updated: ", bookingDetails);
            // }
        }
    } else {
        message = "Payment Failed!"
    }

    const filePath = join(__dirname, '../../../views/confirmation.html');
    let template = readFileSync(filePath, 'utf-8');
    template = template.replace('{{message}}', message)


    return template;

}

export const paymentServices = {
    confirmationService
}