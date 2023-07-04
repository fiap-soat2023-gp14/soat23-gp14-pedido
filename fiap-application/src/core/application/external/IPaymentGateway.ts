export interface IPaymentGateway {
  processPayment(amount: number): Promise<boolean>;
}
