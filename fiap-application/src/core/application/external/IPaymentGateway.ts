import Decimal from 'decimal.js';

export interface IPaymentGateway {
  processPayment(amount: Decimal): Promise<boolean>;
}
