import axios from 'axios';
import { IPaymentGateway } from '../../../core/application/repositories/IPaymentGateway';
import { PaymentFeedbackDTO } from '../../../core/application/dto/PaymentFeedbackDTO';

export default class PaymentGateway implements IPaymentGateway {
  clusterUrl: string;
  constructor() {
    this.clusterUrl = process.env.CLUSTER_URL;
  }

  public async receivePaymentFeedback(
    paymentFeedbackDTO: PaymentFeedbackDTO,
    oauthToken: string,
  ): Promise<void> {
    const headers = {
      Authorization: oauthToken,
    };
    try {
      const response = await axios.post(
        this.clusterUrl + '/payments',
        paymentFeedbackDTO,
        {
          headers,
        },
      );

      if (!response) throw new Error('Error receiving payment feedback');
    } catch (error) {
      throw new Error('Error receiving payment feedback');
    }
    return Promise.resolve();
  }
}
