import { IPaymentGateway } from '../../../core/application/external/IPaymentGateway';
import { Order } from '../../../core/domain/entities/Order';

export default class MercadoPagoPaymentGateway implements IPaymentGateway {
  private static readonly DEFAULT_PAYMENT_METHOD = 'visa';
  private static readonly DESCRIPTION_PREFIX = 'Order Nº ';
  private static readonly DEFAULT_NOTIFICATION_URL =
    'http://localhost:3000/payments/';
  private static readonly DEFAULT_EMAIL = 'email_lojinha_x@gmail.com';

  async createPayment(order: Order): Promise<void> {
    console.info('Sending payment.');
    const paymentCreationDTO = {
      externalId: order.id,
      amount: order.total.value,
      installments: 1,
      description: MercadoPagoPaymentGateway.DESCRIPTION_PREFIX + order.id,
      paymentMethodId: MercadoPagoPaymentGateway.DEFAULT_PAYMENT_METHOD,
      payerEmail: order.customer
        ? order.customer.email
        : MercadoPagoPaymentGateway.DEFAULT_EMAIL,
      notificationUrl: MercadoPagoPaymentGateway.DEFAULT_NOTIFICATION_URL,
    };

    //Enviar pro MERCADO PAGO API
    console.info('Awaiting payment.');
  }
}
