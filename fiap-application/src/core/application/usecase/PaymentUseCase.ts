import { IPaymentGateway } from '../repositories/IPaymentGateway';
import { PaymentFeedbackDTO } from '../dto/PaymentFeedbackDTO';

export class PaymentUseCase {
  public static async processPayment(
    paymentFeedbackDTO: PaymentFeedbackDTO,
    paymentGateway: IPaymentGateway,
    oatyhToken: string,
  ) {
    paymentGateway.receivePaymentFeedback(paymentFeedbackDTO, oatyhToken);
  }
}
