import { IConnection } from '../adapters/external/IConnection';
import MercadoPagoPaymentGateway from '../adapters/external/MercadoPagoPaymentGateway';
import { PaymentFeedbackDTO } from '../../core/application/dto/PaymentFeedbackDTO';
import { Order } from '../../core/domain/entities/Order';
import { PaymentUseCase } from '../../core/application/usecase/PaymentUseCase';
import OrderGateway from '../adapters/gateway/OrderGateway';
import PaymentAdapter from '../../core/application/adapter/PaymentAdapter';

export class PaymentController {
  public static async createPayment(order: Order) {
    const paymentGateway = new MercadoPagoPaymentGateway();
    await PaymentUseCase.createPayment(order, paymentGateway);
  }

  public static async receivePaymentFeedback(
    paymentFeedbackDTO: PaymentFeedbackDTO,
    dbConnection: IConnection,
  ): Promise<void> {
    const orderGateway = new OrderGateway(dbConnection);
    const paymentFeedback = await PaymentAdapter.toDomain(paymentFeedbackDTO);
    await PaymentUseCase.processPayment(paymentFeedback, orderGateway);
  }
}
