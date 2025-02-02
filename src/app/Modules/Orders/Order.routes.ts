import { Router } from 'express';
import authGurd from '../../middlewares/authGurd';
import { orderController } from './Order.controller';

const route = Router();

route.patch('/verify-order', authGurd('admin'), orderController.verifyPayment);

route.post('/create-order', authGurd('user'), orderController.createOrder);
route.patch("/change-order-status/:id", authGurd('admin'), orderController.changeOrderStatus);
route.get("/get-orders", authGurd('admin'), orderController.getOrders)
export const OrderRoutes = route;
