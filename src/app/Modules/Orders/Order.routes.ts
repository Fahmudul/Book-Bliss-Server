import { Router } from 'express';
import authGurd from '../../middlewares/authGurd';
import { orderController } from './Order.controller';

const route = Router();

route.get('/verify-order', authGurd('user'), orderController.verifyPayment);

route.post('/create-order', authGurd('user'), orderController.createOrder);

export const OrderRoutes = route;
