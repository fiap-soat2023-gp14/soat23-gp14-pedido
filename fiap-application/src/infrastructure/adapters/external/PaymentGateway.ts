import { Injectable } from '@nestjs/common';
import { IPaymentGateway } from '../../../core/application/external/IPaymentGateway';
import Decimal from 'decimal.js';

@Injectable()
export default class PaymentGateway implements IPaymentGateway {
  processPayment(amount: Decimal): Promise<boolean> {
    return Promise.resolve(true);
  }
}
