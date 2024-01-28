import UserUseCase from './UserUseCase';
import UserGateway from '../../../infrastructure/adapters/gateway/UserGateway';
import { HttpNotFoundException } from '../../../infrastructure/exceptions/HttpNotFoundException';
jest.mock('../../../infrastructure/adapters/gateway/UserGateway'); // Mock external dependency

describe('UserUseCase', () => {
  describe('getUserById', () => {
    it('should return the user response for a valid user', async () => {
      const userId = '123';
      const oauthToken = 'valid-token';
      const mockUserResponse = { id: userId, name: 'Test User' };

      const userGateway = new UserGateway();
      // Mock the gateway response
      (userGateway.getById as jest.Mock).mockResolvedValueOnce(
        mockUserResponse,
      );

      const user = await UserUseCase.getUserById(
        userId,
        oauthToken,
        userGateway,
      );

      expect(user).toEqual(mockUserResponse);
      expect(userGateway.getById).toHaveBeenCalledWith(userId, oauthToken);
    });

    it('should throw a HttpNotFoundException if the user is not found', async () => {
      const userId = '456';
      const oauthToken = 'valid-token';

      const userGateway = new UserGateway();
      // Mock the gateway response with null
      (userGateway.getById as jest.Mock).mockResolvedValueOnce(null);

      await expect(
        UserUseCase.getUserById(userId, oauthToken, userGateway),
      ).rejects.toThrow(
        new HttpNotFoundException(`User with id ${userId} not found`),
      );

      expect(userGateway.getById).toHaveBeenCalledWith(userId, oauthToken);
    });

    it('should throw an error if the gateway throws an error', async () => {
      const userId = '789';
      const oauthToken = 'valid-token';
      const mockError = new Error('Something went wrong');

      const userGateway = new UserGateway();
      // Mock the gateway to throw an error
      (userGateway.getById as jest.Mock).mockRejectedValueOnce(mockError);

      await expect(
        UserUseCase.getUserById(userId, oauthToken, userGateway),
      ).rejects.toThrow(mockError);

      expect(userGateway.getById).toHaveBeenCalledWith(userId, oauthToken);
    });
  });
});
