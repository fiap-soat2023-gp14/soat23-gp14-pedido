import { PaymentFeedbackDTO } from '../dto/PaymentFeedbackDTO';
import { Order } from '../../domain/entities/Order';

export interface IPaymentGateway {
  createPayment(order: Order): Promise<void>;

  receiveNotification(notification: PaymentFeedbackDTO): Promise<void>;
}
