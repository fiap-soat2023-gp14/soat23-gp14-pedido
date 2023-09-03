import { Order } from '../../domain/entities/Order';

export interface IPaymentGateway {
  createPayment(order: Order): Promise<void>;
}
