import { PaymentFeedbackDTO } from '../../core/application/dto/PaymentFeedbackDTO';
import { PaymentUseCase } from '../../core/application/usecase/PaymentUseCase';
import { IPaymentGateway } from '../../core/application/repositories/IPaymentGateway';
import { MessageProducer } from '../adapters/external/MessageProducer';

export class PaymentController {
  public static async receivePaymentFeedback(
    paymentFeedbackDTO: PaymentFeedbackDTO,
    paymentGateway: IPaymentGateway,
    messageProducer: MessageProducer
  ): Promise<void> {
    await PaymentUseCase.processPayment(
      paymentFeedbackDTO,
      paymentGateway,
      messageProducer,
    );
  }
}
