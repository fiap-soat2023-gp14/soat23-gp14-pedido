import { Injectable } from '@nestjs/common';
import { IPaymentGateway } from '../../../core/application/external/IPaymentGateway';

@Injectable()
export default class PaymentGateway implements IPaymentGateway {
  processPayment(amount: number): Promise<boolean> {
    return Promise.resolve(true);
  }
}
