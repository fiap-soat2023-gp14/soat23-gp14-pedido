import { PaymentFeedbackDTO } from '../dto/PaymentFeedbackDTO';
import { Order } from '../../domain/entities/Order';
import {OrderStatusUpdateDTO} from "../dto/OrderStatusUpdateDTO";

export interface IPaymentGateway {
  createPayment(order: Order): Promise<void>;

  receiveNotification(notification: PaymentFeedbackDTO): Promise<OrderStatusUpdateDTO>;
}
