import { PaymentFeedbackDTO } from '../dto/PaymentFeedbackDTO';
import PaymentAdapter from './PaymentAdapter';
import { PaymentMock } from '../../../infrastructure/mocks/PaymentMock';
import { PaymentFeedback } from '../../domain/entities/PaymentFeedback';

describe('PaymentAdapter', () => {
  describe('toDomain', () => {
    it('should convert PaymentFeedbackDTO to PaymentFeedback domain object', async () => {
      // Arrange
      const paymentFeedbackDTO: PaymentFeedbackDTO =
        PaymentMock.getPaymentFeedback();
      // Act
      const result: PaymentFeedback = await PaymentAdapter.toDomain(
        paymentFeedbackDTO,
      );

      // Assert
      expect(result).toEqual({
        type: 'payment',
        status: 'approved',
        orderId: 'pay-10',
      });
    });
  });
});
