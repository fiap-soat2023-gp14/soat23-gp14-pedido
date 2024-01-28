import { PaymentFeedbackDTO } from '../../core/application/dto/PaymentFeedbackDTO';

export class PaymentMock {
  public static getPaymentFeedback(): PaymentFeedbackDTO {
    const payment: PaymentFeedbackDTO = {
      id: 'pay-10',
      type: 'payment',
      status: 'approved',
      data: { id: 'pay-10' },
    };
    return payment;
  }
}
