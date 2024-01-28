import { Order } from '../../domain/entities/Order';
import { PaymentFeedbackDTO } from '../dto/PaymentFeedbackDTO';

export interface IPaymentGateway {
  receivePaymentFeedback(
    paymentFeedbackDTO: PaymentFeedbackDTO,
    oauthToken: string,
  ): Promise<void>;
}
