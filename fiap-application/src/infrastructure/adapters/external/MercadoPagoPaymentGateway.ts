import { IPaymentGateway } from '../../../core/application/external/IPaymentGateway';
import { PaymentFeedbackDTO } from '../../../core/application/dto/PaymentFeedbackDTO';
import { IConnection } from './IConnection';
import OrderGateway from '../gateway/OrderGateway';
import { PaymentUseCase } from '../../../core/application/usecase/PaymentUseCase';
import { Order } from '../../../core/domain/entities/Order';
import {HttpException, HttpStatus} from "@nestjs/common";

export default class MercadoPagoPaymentGateway implements IPaymentGateway {
  private readonly dbConnection: IConnection;
  constructor(IConnection: IConnection) {
    this.dbConnection = IConnection;
  }

  async createPayment(order: Order): Promise<void> {
    console.info('Sending payment');
    await PaymentUseCase.createPayment(order);
    //Recuperar o paymentCreationDTO do use case e enviar pro MERCADO PAGO API
    console.info('Awaiting payment');
  }

  async receiveNotification(
    paymentFeedbackDTO: PaymentFeedbackDTO,
  ): Promise<void> {
    await PaymentUseCase.processPayment(
      paymentFeedbackDTO,
      new OrderGateway(this.dbConnection),
    );
    console.info('Payment successfully processed');
  }
}
