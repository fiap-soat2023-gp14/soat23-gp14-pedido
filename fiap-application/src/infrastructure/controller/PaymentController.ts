import { IConnection } from '../adapters/external/IConnection';
import MercadoPagoPaymentGateway from '../adapters/external/MercadoPagoPaymentGateway';
import { PaymentFeedbackDTO } from '../../core/application/dto/PaymentFeedbackDTO';
import { Order } from '../../core/domain/entities/Order';
import {PaymentUseCase} from "../../core/application/usecase/PaymentUseCase";
import OrderGateway from "../adapters/gateway/OrderGateway";

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
    const paymentGateway = new MercadoPagoPaymentGateway(); //Verificar se essa instacia aqui é OK
    const orderStatusUpdateDTO = await paymentGateway.receiveNotification(paymentFeedbackDTO);
    await PaymentUseCase.processPayment(orderStatusUpdateDTO.status, orderStatusUpdateDTO.id, orderGateway);
  }
}
