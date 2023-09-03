import { IConnection } from '../adapters/external/IConnection';
import MercadoPagoPaymentGateway from '../adapters/external/MercadoPagoPaymentGateway';
import { PaymentFeedbackDTO } from '../../core/application/dto/PaymentFeedbackDTO';
import { Order } from '../../core/domain/entities/Order';

export class PaymentController {
  public static async createPayment(order: Order, dbConnection: IConnection) {
    const paymentGateway = new MercadoPagoPaymentGateway(dbConnection);
    await paymentGateway.createPayment(order);
  }

  public static async receivePaymentFeedback(
    paymentFeedbackDTO: PaymentFeedbackDTO,
    dbConnection: IConnection,
  ): Promise<void> {
    //TODO será que eu nao poderia injetar na API e receber aqui só a IpaymentGateway? To achando estranho ter que usar a implementação aqui
    const paymentGateway = new MercadoPagoPaymentGateway(dbConnection);
    await paymentGateway.receiveNotification(paymentFeedbackDTO);
  }
}
