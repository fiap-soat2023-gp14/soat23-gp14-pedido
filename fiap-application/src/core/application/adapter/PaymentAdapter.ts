import { PaymentFeedbackDTO } from '../dto/PaymentFeedbackDTO';
import { PaymentFeedback } from '../../domain/entities/PaymentFeedback';

export default class PaymentAdapter {
  static async toDomain(
    paymentFeedback: PaymentFeedbackDTO,
  ): Promise<PaymentFeedback> {
    return {
      type: paymentFeedback.type,
      status: paymentFeedback.status,
      orderId: paymentFeedback.data.id,
    };
  }
}
