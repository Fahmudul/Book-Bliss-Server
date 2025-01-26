import catchAsync from '../../Utils/catchAsync';
import sendResponse from '../../Utils/sendResponse';
import httpStatus from 'http-status';
import { orderService } from './Order.services';

const createOrder = catchAsync(async (req, res) => {
  const user = req.user;

  console.log(req.body);
  const order = await orderService.createOrder(user, req.body, req.ip!);
  console.log('from controller', order);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Order placed successfully',
    data: order,
  });
});

const getOrders = catchAsync(async (req, res) => {
  const order = await orderService.getOrders();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Order retrieved successfully',
    data: order,
  });
});

const verifyPayment = catchAsync(async (req, res) => {
  const order = await orderService.verifyPayment(req.query.order_id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Order verified successfully',
    data: order,
  });
});

export const orderController = { createOrder, verifyPayment, getOrders };
