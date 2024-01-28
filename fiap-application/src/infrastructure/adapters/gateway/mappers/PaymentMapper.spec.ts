import { PaymentMapper } from './PaymentMapper';
import { Order } from '../../../../core/domain/entities/Order';
import { OrderMock } from '../../../mocks/OrderMock';
import { PaymentFeedbackDTO } from '../../../../core/application/dto/PaymentFeedbackDTO';

describe('PaymentMapper', () => {
  describe('toPaymnent', () => {
    it('should return a PaymentFeedbackDTO object with correct values', async () => {
      // Arrange
      const order: Order = await OrderMock.getOrder();

      // Act
      const result: PaymentFeedbackDTO = PaymentMapper.toPaymnent(order);

      // Assert
      expect(result.id).toBeDefined();
      expect(result.type).toBe('payment');
      expect(result.status).toBe('approved');
      expect(result.data).toEqual({ id: result.id });
    });

    it('should generate a unique id if the order does not have an id', async () => {
      // Arrange
      const order: Order = await OrderMock.getOrder();

      // Act
      const result: PaymentFeedbackDTO = PaymentMapper.toPaymnent(order);

      // Assert
      expect(result.id).toBeDefined();
      expect(result.type).toBe('payment');
      expect(result.status).toBe('approved');
      expect(result.data).toEqual({ id: result.id });
    });
  });
});
