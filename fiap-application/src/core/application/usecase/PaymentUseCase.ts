import { OrderStatusUpdateDTO } from '../dto/OrderStatusUpdateDTO';
import { OrderStatus } from '../../domain/enums/OrderStatus';
import { PaymentFeedbackDTO } from '../dto/PaymentFeedbackDTO';
import OrderUseCase from './OrderUseCase';
import { IOrderGateway } from '../repositories/IOrderGateway';
import OrderAdapter from '../adapter/OrderAdapter';
import { PaymentCreationDTO } from '../dto/PaymentCreationDTO';
import { Order } from '../../domain/entities/Order';
import { IPaymentGateway } from '../external/IPaymentGateway';

export class PaymentUseCase {

  public static async createPayment(order: Order, paymentGateway: IPaymentGateway) {
    await paymentGateway.createPayment(order);
  }
  public static async processPayment(
    newStatus: OrderStatus,
    orderId: string,
    orderGateway: IOrderGateway,
  ) {
    if (newStatus === OrderStatus.PAID || newStatus === OrderStatus.CANCELLED) {
      await OrderUseCase.updateOrder(orderId, newStatus, orderGateway);
    }
  }
}
