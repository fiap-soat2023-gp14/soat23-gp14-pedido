import { PaymentFeedbackDTO } from '../dto/PaymentFeedbackDTO';
import {MessageProducer} from "../../../infrastructure/adapters/external/MessageProducer";

export interface IPaymentGateway {
  receivePaymentFeedback(
    paymentFeedbackDTO: PaymentFeedbackDTO,
    messageProducer: MessageProducer,
  ): Promise<void>;
}
