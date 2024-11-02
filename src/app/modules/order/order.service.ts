/* eslint-disable @typescript-eslint/no-explicit-any */
import { initiatePayment } from '../payment/payment.utils';
import { Post } from '../Post/post.model';
import Order from './order.model';

const createOrder = async (orderData: any) => {
    // console.log("get data from frontend ->", orderData);
    const { user, article } = orderData; // Keep 'article' as per frontend data

    // Fetch the article details from the database
    const fetchedArticle = await Post.findById(article);
    if (!fetchedArticle) {
        throw new Error('Article not found');
    }

    // Use isPremium to determine the price
    const articlePrice = fetchedArticle.isPremium ? 100 : 0; // Example: Premium articles cost 100, others cost 0
    const totalPrice = articlePrice; // Since there's only one article, total price equals article price

    const transactionId = `TXN-${Date.now()}`;

    // Prepare the product details
    const productDetails = {
        product: fetchedArticle._id,
        quantity: 1,
    };

    // Create the order with the product details
    const order = new Order({
        user,
        products: [productDetails], // Pass the productDetails as an array
        totalPrice,
        status: 'Pending',
        paymentStatus: 'Pending',
        transactionId,
    });


    await order.save();

    //payment gateway work start here
    const paymentData = {
        transactionId,
        totalPrice,
        customerName: orderData.user.name,
        customerEmail: orderData.user.email,
        customerPhone: orderData.user.mobileNumber,
        // customerAddress: "no need",
    }

    //payment
    const paymentSession = await initiatePayment(paymentData);
    // console.log(paymentSession);

    return paymentSession;
};

export const orderService = {
    createOrder,
};
