import { OrderStatus } from '../../domain/enums/OrderStatus';
import OrderUseCase from './OrderUseCase';
import { IOrderGateway } from '../repositories/IOrderGateway';
import { Order } from '../../domain/entities/Order';
import { IPaymentGateway } from '../external/IPaymentGateway';
import { PaymentFeedback } from '../../domain/entities/PaymentFeedback';

export class PaymentUseCase {
  public static async createPayment(
    order: Order,
    paymentGateway: IPaymentGateway,
  ) {
    await paymentGateway.createPayment(order);
  }

  public static async processPayment(
    paymentFeedback: PaymentFeedback,
    orderGateway: IOrderGateway,
  ) {
    if (paymentFeedback.type === 'payment') {
      if (paymentFeedback.status === 'approved') {
        console.info('Payment approved.');
        await OrderUseCase.updateOrder(
          paymentFeedback.orderId,
          OrderStatus.PAID,
          orderGateway,
        );
      } else if (paymentFeedback.status === 'declined') {
        console.info('Payment declined.');
        await OrderUseCase.updateOrder(
          paymentFeedback.orderId,
          OrderStatus.CANCELLED,
          orderGateway,
        );
      }
    }
  }
}
