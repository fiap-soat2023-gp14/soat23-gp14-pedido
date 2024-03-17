import PaymentGateway from './PaymentGateway';
import { PaymentFeedbackDTO } from '../../../core/application/dto/PaymentFeedbackDTO';
import { PaymentMock } from '../../mocks/PaymentMock';
import {MessageProducer} from "../external/MessageProducer";
import {Test, TestingModule} from "@nestjs/testing";

jest.mock('../external/MessageProducer');
jest.mock('@ssut/nestjs-sqs', () => ({
  SqsService: jest.fn().mockImplementation(() => ({
    send: jest.fn().mockResolvedValue({}), // Adjust behavior as needed
  })),
}));

describe('PaymentGateway', () => {
  let paymentGateway: PaymentGateway;
  let messageProducer: MessageProducer;
  const oauthToken = 'your_oauth_token';
  const expectedUrl = 'http://localhost';
  beforeEach(async () => {
    paymentGateway = new PaymentGateway();
    paymentGateway.clusterUrl = expectedUrl;

    const module: TestingModule = await Test.createTestingModule({
      providers: [MessageProducer],
    }).compile();

    messageProducer = module.get<MessageProducer>(MessageProducer);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('receivePaymentFeedback', () => {
    it('should send payment feedback to the server with the correct parameters', async () => {
      // Arrange
      const paymentFeedbackDTO: PaymentFeedbackDTO =
        PaymentMock.getPaymentFeedback();


      // Act
      await paymentGateway.receivePaymentFeedback(
        paymentFeedbackDTO,
        messageProducer
      );

      // Assert
      expect(messageProducer.sendMessage).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if there is an error receiving payment feedback', async () => {
      // Arrange
      const paymentFeedbackDTO: PaymentFeedbackDTO =
        PaymentMock.getPaymentFeedback();
      const expectedErrorMessage = 'Error receiving payment feedback';
      (messageProducer.sendMessage as jest.Mock).mockRejectedValueOnce(
        new Error('Network error'),
      );

      // Act & Assert
      await expect(
        paymentGateway.receivePaymentFeedback(paymentFeedbackDTO, messageProducer),
      ).rejects.toThrow(expectedErrorMessage);
    });
  });
});
