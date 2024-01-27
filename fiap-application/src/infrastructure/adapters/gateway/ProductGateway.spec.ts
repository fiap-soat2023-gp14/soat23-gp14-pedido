import axios from 'axios';
import ProductGateway from './ProductGateway';

jest.mock('axios');

describe('ProductGateway', () => {
  describe('getById', () => {
    it('should return the product data if the request is successful', async () => {
      const id = '123';
      const oauthToken = 'valid-token';
      const mockProduct = { id: '123', name: 'Test Product' };
      const mockResponse = { status: 200, data: mockProduct };

      (axios.get as jest.Mock).mockResolvedValueOnce(mockResponse);

      const productGateway = new ProductGateway();
      const result = await productGateway.getById(id, oauthToken);

      expect(result).toEqual(mockProduct);
      expect(axios.get).toHaveBeenCalledWith(
        productGateway.clusterUrl + '/products/' + id,
        { headers: { Authorization: oauthToken } },
      );
    });

    it('should return null if the request is not successful', async () => {
      const id = '123';
      const oauthToken = 'valid-token';
      const mockResponse = { status: 404 };

      (axios.get as jest.Mock).mockResolvedValueOnce(mockResponse);

      const productGateway = new ProductGateway();
      const result = await productGateway.getById(id, oauthToken);

      expect(result).toBeNull();
      expect(axios.get).toHaveBeenCalledWith(
        productGateway.clusterUrl + '/products/' + id,
        { headers: { Authorization: oauthToken } },
      );
    });

    it('should return null if the request throws an error', async () => {
      const id = '123';
      const oauthToken = 'valid-token';
      const mockError = new Error('Request failed');

      (axios.get as jest.Mock).mockRejectedValueOnce(mockError);

      const productGateway = new ProductGateway();
      const result = await productGateway.getById(id, oauthToken);

      expect(result).toBeNull();
      expect(axios.get).toHaveBeenCalledWith(
        productGateway.clusterUrl + '/products/' + id,
        { headers: { Authorization: oauthToken } },
      );
    });
  });
});
