import { IPaymentGateway } from '../../../core/application/external/IPaymentGateway';
import { PaymentFeedbackDTO } from '../../../core/application/dto/PaymentFeedbackDTO';
import { IConnection } from './IConnection';
import OrderGateway from '../gateway/OrderGateway';
import { PaymentUseCase } from '../../../core/application/usecase/PaymentUseCase';
import { Order } from '../../../core/domain/entities/Order';

export default class MercadoPagoPaymentGateway implements IPaymentGateway {
  private readonly dbConnection: IConnection;
  constructor(IConnection: IConnection) {
    this.dbConnection = IConnection;
  }

  async createPayment(order: Order): Promise<void> {
    await PaymentUseCase.createPayment(order);
    //Recuperar o paymentCreationDTO do use case e enviar pro MERCADO PAGO API
  }

  async receiveNotification(
    paymentFeedbackDTO: PaymentFeedbackDTO,
  ): Promise<void> {
    await PaymentUseCase.processPayment(
      paymentFeedbackDTO,
      new OrderGateway(this.dbConnection),
    );
  }
}
