import { IPaymentGateway } from '../repositories/IPaymentGateway';
import { PaymentFeedbackDTO } from '../dto/PaymentFeedbackDTO';
import {MessageProducer} from "../../../infrastructure/adapters/external/MessageProducer";

export class PaymentUseCase {
  public static async processPayment(
    paymentFeedbackDTO: PaymentFeedbackDTO,
    paymentGateway: IPaymentGateway,
    messageProducer: MessageProducer,
  ) {
    paymentGateway.receivePaymentFeedback(paymentFeedbackDTO, messageProducer);
  }
}
