import { Router } from 'express';
import { createOrderController, getOrderController } from './order.controller';

const router = Router();

// Route to create an order
router.post('/create', createOrderController);
router.get('/', getOrderController);

export const orderRoutes = router;