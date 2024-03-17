import { PaymentController } from './PaymentController';
import { PaymentMock } from '../mocks/PaymentMock';
import { PaymentFeedbackDTO } from '../../core/application/dto/PaymentFeedbackDTO';
import { IPaymentGateway } from '../../core/application/repositories/IPaymentGateway';
import PaymentGateway from '../adapters/gateway/PaymentGateway';
import { PaymentUseCase } from '../../core/application/usecase/PaymentUseCase';
import {MessageProducer} from "../adapters/external/MessageProducer";
import {Test, TestingModule} from "@nestjs/testing";

jest.mock('../../core/application/usecase/PaymentUseCase');
jest.mock('../adapters/external/MessageProducer');

jest.mock('@ssut/nestjs-sqs', () => ({
  SqsService: jest.fn().mockImplementation(() => ({
    send: jest.fn().mockResolvedValue({}), // Adjust behavior as needed
  })),
}));

describe('PaymentController', () => {
  let messageProducer: MessageProducer;

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [MessageProducer],
    }).compile();

    messageProducer = module.get<MessageProducer>(MessageProducer);
  });
  describe('receivePaymentFeedback', () => {
    it('should call PaymentUseCase.processPayment with the correct arguments', async () => {
      // Arrange
      const paymentFeedbackDTO: PaymentFeedbackDTO =
        PaymentMock.getPaymentFeedback();
      const oauthToken = 'valid-token';
      const paymentGateway: IPaymentGateway = new PaymentGateway();

      await PaymentController.receivePaymentFeedback(
        paymentFeedbackDTO,
        paymentGateway, messageProducer,
      );

      // Assert
      expect(PaymentUseCase.processPayment).toHaveBeenCalledWith(
        paymentFeedbackDTO,
        paymentGateway,
        messageProducer,
      );
    });
  });
});
