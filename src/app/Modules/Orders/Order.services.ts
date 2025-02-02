import httpStatus from 'http-status';
import CustomError from '../../Errors/CustomError';
import Order from './Order.model';
import { orderUtils } from './Order.utils';
import BookModel from '../Book/Book.model';
import { IUser } from '../User/User.interface';
import { Types } from 'mongoose';

const createOrder = async (
  user: IUser,
  payload: { products: { productId: Types.ObjectId; quantity: number }[] },
  client_ip: string,
) => {
  if (!payload?.products?.length)
    throw new CustomError(httpStatus.NOT_ACCEPTABLE, 'Order is not specified');

  const products = payload.products;

  let totalPrice = 0;
  const productDetails = await Promise.all(
    products.map(async (item) => {
      const product = await BookModel.findById(item.productId);
      if (product) {
        const subtotal = product ? (product.price || 0) * item.quantity : 0;
        totalPrice += subtotal;
        return item;
      }
    }),
  );
  let order = await Order.create({
    user: user.id,
    products: productDetails,
    totalPrice,
  });
  // payment integration
  const shurjopayPayload = {
    amount: totalPrice,
    order_id: order._id,
    currency: 'BDT',
    customer_name: user.name || 'Joens',
    customer_address: user.address || '23 main road',
    customer_email: user.email,
    customer_phone: user.phone || '1234567890',
    customer_city: user.city || 'Dhaka',
    client_ip,
  };

  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);
  console.log('payment info', payment);
  if (payment?.transactionStatus) {
    order = await order.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }

  return payment.checkout_url;
};

const getOrders = async () => {
  const data = await Order.find().populate("user");
  return data;
};

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await Order.findOneAndUpdate(
      {
        'transaction.id': order_id,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == 'Success'
            ? 'Paid'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'Pending'
              : verifiedPayment[0].bank_status == 'Cancel'
                ? 'Cancelled'
                : '',
      },
    );
  }

  return verifiedPayment;
};

const changeOrderStatus = async (id: string, status: string) => {
  const result = await Order.findByIdAndUpdate(id, { status });
  return result;
};
export const orderService = {
  createOrder,
  getOrders,
  verifyPayment,
  changeOrderStatus,
};
