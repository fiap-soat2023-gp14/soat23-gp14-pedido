import { IPaymentGateway } from '../../../core/application/repositories/IPaymentGateway';
import { PaymentFeedbackDTO } from '../../../core/application/dto/PaymentFeedbackDTO';
import {MessageProducer} from "../external/MessageProducer";

export default class PaymentGateway implements IPaymentGateway {
  clusterUrl: string;
  constructor() {
    this.clusterUrl = process.env.CLUSTER_URL;
  }

  public async receivePaymentFeedback(
    paymentFeedbackDTO: PaymentFeedbackDTO,
    messageProducer: MessageProducer,
  ): Promise<void> {

    try {
      await messageProducer.sendMessage(paymentFeedbackDTO);

    } catch (error) {
      throw new Error('Error receiving payment feedback');
    }
    return Promise.resolve();
  }
}
