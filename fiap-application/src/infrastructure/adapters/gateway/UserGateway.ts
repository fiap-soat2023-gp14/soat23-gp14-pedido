import { IUserGateway } from 'src/core/application/repositories/IUserGateway';
import axios from 'axios';
import { UserCreationDTO } from 'src/core/application/dto/UserCreationDTO';

export default class UserGateway implements IUserGateway {
  baseUrl: string;
  constructor() {
    this.baseUrl = process.env.CLUSTER_URL + '/users/';
  }

  public async getById(
    id: string,
    oauthToken: string,
  ): Promise<UserCreationDTO> {
    const headers = {
      Authorization: oauthToken,
    };
    try {
      const response = await axios.get(this.baseUrl + id, {
        headers,
      });

      if (response.status != 200) {
        return Promise.resolve(null);
      }

      if (!response) return Promise.resolve(null);

      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.resolve(null);
    }
  }

  async removeUserById(id: string, oauthToken: string): Promise<void> {
    const headers = {
      Authorization: oauthToken,
    };
    try {
      console.log('Request to remove user data from Users MS');
      const response = await axios.delete(this.baseUrl + id, {
        headers,
      });

      if (!response || response.status != 204) {
        return Promise.resolve(null);
      }

      return Promise.resolve(response.data);
    } catch (error) {
      console.log('Error removing user data ' + error);
      return Promise.resolve(null);
    }
  }
}
