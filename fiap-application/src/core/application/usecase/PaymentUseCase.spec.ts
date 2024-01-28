import { PaymentUseCase } from './PaymentUseCase';
import { PaymentFeedbackDTO } from '../dto/PaymentFeedbackDTO';
import { PaymentMock } from '../../../infrastructure/mocks/PaymentMock';
import { IPaymentGateway } from '../repositories/IPaymentGateway';

describe('PaymentUseCase', () => {
  describe('processPayment', () => {
    it('should call receivePaymentFeedback method of paymentGateway with the correct parameters', async () => {
      // Arrange
      const paymentFeedbackDTO: PaymentFeedbackDTO =
        PaymentMock.getPaymentFeedback();
      const paymentGateway: IPaymentGateway = {
        receivePaymentFeedback: jest.fn(),
      };
      const oatyhToken = 'your-oatyh-token';

      // Act
      await PaymentUseCase.processPayment(
        paymentFeedbackDTO,
        paymentGateway,
        oatyhToken,
      );

      // Assert
      expect(paymentGateway.receivePaymentFeedback).toHaveBeenCalledWith(
        paymentFeedbackDTO,
        oatyhToken,
      );
    });
  });
});
