import { PaymentFeedbackDTO } from '../../core/application/dto/PaymentFeedbackDTO';
import { PaymentUseCase } from '../../core/application/usecase/PaymentUseCase';
import { IPaymentGateway } from '../../core/application/repositories/IPaymentGateway';

export class PaymentController {
  public static async receivePaymentFeedback(
    paymentFeedbackDTO: PaymentFeedbackDTO,
    oauthToken: string,
    paymentGateway: IPaymentGateway,
  ): Promise<void> {
    await PaymentUseCase.processPayment(
      paymentFeedbackDTO,
      paymentGateway,
      oauthToken,
    );
  }
}
