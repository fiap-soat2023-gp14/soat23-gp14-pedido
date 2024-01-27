import ProductUseCase from './ProductUseCase';
import { HttpNotFoundException } from '../../../infrastructure/exceptions/HttpNotFoundException';
import ProductGateway from '../../../infrastructure/adapters/gateway/ProductGateway';
import { ProductMock } from '../../../infrastructure/mocks/ProductMock';

jest.mock('../../../infrastructure/adapters/gateway/ProductGateway');

describe('ProductUseCase', () => {
  describe('getProductById', () => {
    it('should return the product domain object for a valid product', async () => {
      const productId = '123';
      const oauthToken = 'valid-token';
      const mockProduct = ProductMock.getProduct();
      const producGateway = new ProductGateway();
      // Mock the gateway response
      (producGateway.getById as jest.Mock).mockResolvedValueOnce(mockProduct);

      await ProductUseCase.getProductById(productId, oauthToken, producGateway);
      expect(producGateway.getById).toHaveBeenCalledWith(productId, oauthToken);
    });

    it('should throw a HttpNotFoundException if the product is not found', async () => {
      const productId = '456';
      const oauthToken = 'valid-token';
      const producGateway = new ProductGateway();
      // Mock the gateway response with null
      (producGateway.getById as jest.Mock).mockResolvedValueOnce(null);

      await expect(
        ProductUseCase.getProductById(productId, oauthToken, producGateway),
      ).rejects.toThrow(
        new HttpNotFoundException(`Product with id ${productId} not found`),
      );

      expect(producGateway.getById).toHaveBeenCalledWith(productId, oauthToken);
    });

    it('should throw an error if the gateway throws an error', async () => {
      const productId = '789';
      const oauthToken = 'valid-token';
      const mockError = new Error('Something went wrong');

      const producGateway = new ProductGateway();
      // Mock the gateway to throw an error
      (producGateway.getById as jest.Mock).mockRejectedValueOnce(mockError);

      await expect(
        ProductUseCase.getProductById(productId, oauthToken, producGateway),
      ).rejects.toThrow(mockError);

      expect(producGateway.getById).toHaveBeenCalledWith(productId, oauthToken);
    });
  });
});
