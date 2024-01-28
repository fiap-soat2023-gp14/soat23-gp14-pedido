import { PaymentController } from './PaymentController';
import { PaymentMock } from '../mocks/PaymentMock';
import { PaymentFeedbackDTO } from '../../core/application/dto/PaymentFeedbackDTO';
import { IPaymentGateway } from '../../core/application/repositories/IPaymentGateway';
import PaymentGateway from '../adapters/gateway/PaymentGateway';
import { PaymentUseCase } from '../../core/application/usecase/PaymentUseCase';

jest.mock('../../core/application/usecase/PaymentUseCase');

describe('PaymentController', () => {
  describe('receivePaymentFeedback', () => {
    it('should call PaymentUseCase.processPayment with the correct arguments', async () => {
      // Arrange
      const paymentFeedbackDTO: PaymentFeedbackDTO =
        PaymentMock.getPaymentFeedback();
      const oauthToken = 'valid-token';
      const paymentGateway: IPaymentGateway = new PaymentGateway();

      // Act
      await PaymentController.receivePaymentFeedback(
        paymentFeedbackDTO,
        oauthToken,
        paymentGateway,
      );

      // Assert
      expect(PaymentUseCase.processPayment).toHaveBeenCalledWith(
        paymentFeedbackDTO,
        paymentGateway,
        oauthToken,
      );
    });
  });
});
