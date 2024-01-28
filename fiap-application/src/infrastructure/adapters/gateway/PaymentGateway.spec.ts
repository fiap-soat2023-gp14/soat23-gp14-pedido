import axios from 'axios';
import PaymentGateway from './PaymentGateway';
import { PaymentFeedbackDTO } from '../../../core/application/dto/PaymentFeedbackDTO';
import { PaymentMock } from '../../mocks/PaymentMock';

jest.mock('axios');

describe('PaymentGateway', () => {
  let paymentGateway: PaymentGateway;
  const oauthToken = 'your_oauth_token';
  const expectedUrl = 'http://localhost';
  beforeEach(() => {
    paymentGateway = new PaymentGateway();
    paymentGateway.clusterUrl = expectedUrl;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('receivePaymentFeedback', () => {
    it('should send payment feedback to the server with the correct parameters', async () => {
      // Arrange
      const paymentFeedbackDTO: PaymentFeedbackDTO =
        PaymentMock.getPaymentFeedback();

      const expectedHeaders = {
        Authorization: oauthToken,
      };
      const mockResponse = { status: 204, data: {} };
      (axios.post as jest.Mock).mockResolvedValueOnce(mockResponse);
      // Act
      await paymentGateway.receivePaymentFeedback(
        paymentFeedbackDTO,
        oauthToken,
      );

      // Assert
      expect(axios.post).toHaveBeenCalledWith(
        expectedUrl + '/payments',
        paymentFeedbackDTO,
        {
        headers: expectedHeaders,
      });
    });

    it('should throw an error if there is an error receiving payment feedback', async () => {
      // Arrange
      const paymentFeedbackDTO: PaymentFeedbackDTO =
        PaymentMock.getPaymentFeedback();
      const expectedErrorMessage = 'Error receiving payment feedback';
      (axios.post as jest.Mock).mockRejectedValueOnce(
        new Error('Network error'),
      );

      // Act & Assert
      await expect(
        paymentGateway.receivePaymentFeedback(paymentFeedbackDTO, oauthToken),
      ).rejects.toThrow(expectedErrorMessage);
    });
  });
});
