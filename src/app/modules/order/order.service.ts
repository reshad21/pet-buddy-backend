/* eslint-disable @typescript-eslint/no-explicit-any */
import { Post } from '../Post/post.model';
import Order from './order.model';

const createOrder = async (orderData: any) => {
    console.log("get data from backend when call appi->", orderData);
    const { user, article } = orderData; // Directly destructure the single article

    // Fetch the article details
    const fetchedArticle = await Post.findById(article);
    if (!fetchedArticle) {
        throw new Error('Article not found');
    }

    // Use isPremium to determine price
    const articlePrice = fetchedArticle.isPremium ? 100 : 0; // Example: Premium articles cost 100, others cost 0
    const totalPrice = articlePrice; // Since only one article, total price equals article price

    const transactionId = `TXN-${Date.now()}`;

    const order = new Order({
        user,
        articles: [{ article: fetchedArticle._id, quantity: 1 }], // Store the article with a quantity of 1
        totalPrice,
        status: 'Pending',
        paymentStatus: 'Pending',
        transactionId
    });

    await order.save();

    return order;
};

export const orderService = {
    createOrder
};
