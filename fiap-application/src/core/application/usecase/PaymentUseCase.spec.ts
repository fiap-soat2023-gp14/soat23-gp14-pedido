import { PaymentUseCase } from './PaymentUseCase';
import { PaymentFeedbackDTO } from '../dto/PaymentFeedbackDTO';
import { PaymentMock } from '../../../infrastructure/mocks/PaymentMock';
import { IPaymentGateway } from '../repositories/IPaymentGateway';
import {MessageProducer} from "../../../infrastructure/adapters/external/MessageProducer";

jest.mock('../../../infrastructure/adapters/external/MessageProducer');
describe('PaymentUseCase', () => {
  let messageProducer: MessageProducer;

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
        messageProducer,
      );

      // Assert
      expect(paymentGateway.receivePaymentFeedback).toHaveBeenCalledWith(
        paymentFeedbackDTO,
        messageProducer,
      );
    });
  });
});
