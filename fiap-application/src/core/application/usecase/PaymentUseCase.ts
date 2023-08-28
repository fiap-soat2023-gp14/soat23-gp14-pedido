import { OrderStatusUpdateDTO } from '../dto/OrderStatusUpdateDTO';
import { OrderStatus } from '../../domain/enums/OrderStatus';
import { PaymentFeedbackDTO } from '../dto/PaymentFeedbackDTO';
import OrderUseCase from './OrderUseCase';
import { IOrderGateway } from '../repositories/IOrderGateway';
import OrderAdapter from '../adapter/OrderAdapter';
import { PaymentCreationDTO } from '../dto/PaymentCreationDTO';
import { Order } from '../../domain/entities/Order';

export class PaymentUseCase {
  private static readonly DEFAULT_PAYMENT_METHOD = 'visa';
  private static readonly DESCRIPTION_PREFIX = 'Order Nº ';
  private static readonly DEFAULT_NOTIFICATION_URL =
    'http://localhost:3000/payments/';

  public static async createPayment(order: Order): Promise<PaymentCreationDTO> {
    return {
      externalId: order.id,
      amount: order.total.value,
      installments: 1,
      description: PaymentUseCase.DESCRIPTION_PREFIX + order.id,
      paymentMethodId: PaymentUseCase.DEFAULT_PAYMENT_METHOD,
      payerEmail: order.customer.email,
      notificationUrl: PaymentUseCase.DEFAULT_NOTIFICATION_URL,
    };
  }

  public static async processPayment(
    paymentFeedbackDTO: PaymentFeedbackDTO,
    orderGateway: IOrderGateway,
  ) {
    if (paymentFeedbackDTO.type === 'payment') {
      const orderStatusToUpdate = new OrderStatusUpdateDTO();
      orderStatusToUpdate.id = paymentFeedbackDTO.data.id;
      if (paymentFeedbackDTO.status === 'approved') {
        orderStatusToUpdate.status = OrderStatus.PAID;
      } else if (paymentFeedbackDTO.status === 'declined') {
        orderStatusToUpdate.status = OrderStatus.CANCELLED;
      }
      const order = await OrderAdapter.toOrderUpdateDomain(orderStatusToUpdate);
      await OrderUseCase.updateOrder(
        paymentFeedbackDTO.data.id,
        order,
        orderGateway,
      );
    }
  }
}
