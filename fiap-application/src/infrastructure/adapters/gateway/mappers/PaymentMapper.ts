import { v4 } from 'uuid';
import { Order } from '../../../../core/domain/entities/Order';
import { PaymentFeedbackDTO } from '../../../../core/application/dto/PaymentFeedbackDTO';

export class PaymentMapper {
  static toPaymnent(order: Order): PaymentFeedbackDTO {
    const id = order.id || v4();
    return {
      id: id,
      type: 'payment',
      status: 'approved',
      data: { id: id },
    };
  }
}
