import axios from 'axios';
import UserGateway from './UserGateway';

jest.mock('axios');

describe('UserGateway', () => {
  describe('getById', () => {
    it('should return the user data if the request is successful', async () => {
      const id = '123';
      const oauthToken = 'valid-token';
      const mockUser = {id: '123', name: 'Test User'};
      const mockResponse = {status: 200, data: mockUser};

      (axios.get as jest.Mock).mockResolvedValueOnce(mockResponse);

      const userGateway = new UserGateway();
      const result = await userGateway.getById(id, oauthToken);

      expect(result).toEqual(mockUser);
      expect(axios.get).toHaveBeenCalledWith(
          userGateway.baseUrl + id,
          {headers: {Authorization: oauthToken}},
      );
    });

    it('should return null if the request is not successful', async () => {
      const id = '123';
      const oauthToken = 'valid-token';
      const mockResponse = {status: 404};

      (axios.get as jest.Mock).mockResolvedValueOnce(mockResponse);

      const userGateway = new UserGateway();
      const result = await userGateway.getById(id, oauthToken);

      expect(result).toBeNull();
      expect(axios.get).toHaveBeenCalledWith(
          userGateway.baseUrl + id,
          {headers: {Authorization: oauthToken}},
      );
    });

    it('should return null if the request throws an error', async () => {
      const id = '123';
      const oauthToken = 'valid-token';
      const mockError = new Error('Request failed');

      (axios.get as jest.Mock).mockRejectedValueOnce(mockError);

      const userGateway = new UserGateway();
      const result = await userGateway.getById(id, oauthToken);

      expect(result).toBeNull();
      expect(axios.get).toHaveBeenCalledWith(
          userGateway.baseUrl + id,
          {headers: {Authorization: oauthToken}},
      );
    });

    it('should remove the user data if the request is successful', async () => {
      const id = '123';
      const oauthToken = 'valid-token';
      const mockResponse = { status: 204 };

      (axios.delete as jest.Mock).mockResolvedValueOnce(mockResponse);

      const userGateway = new UserGateway();
      await userGateway.removeUserById(id, oauthToken);

      expect(axios.delete).toHaveBeenCalledWith(
          userGateway.baseUrl + id,
          {headers: {Authorization: oauthToken}},
      );
    });
  });
});
