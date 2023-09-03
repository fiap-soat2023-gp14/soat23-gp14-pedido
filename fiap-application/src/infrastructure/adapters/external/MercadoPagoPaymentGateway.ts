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

    //
    // const paymentSuccessful = await this.paymentGateway.processPayment(
    //   order.total.value,
    // );

    const paymentSuccessful = true; //TODO: change to PaymentUseCase
    if (paymentSuccessful) {
      console.info('Payment successful');

    } else {
      console.error('Payment failed');
      throw new HttpException('Payment failed', HttpStatus.BAD_GATEWAY);
    }

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
