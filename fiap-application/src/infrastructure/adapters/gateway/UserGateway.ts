import { IUserGateway } from 'src/core/application/repositories/IUserGateway';
import axios from 'axios';
import { UserCreationDTO } from 'src/core/application/dto/UserCreationDTO';

export default class UserGateway implements IUserGateway {
  clusterUrl: string;
  constructor() {
    this.clusterUrl = process.env.CLUSTER_URL;
  }

  public async getById(
    id: string,
    oauthToken: string,
  ): Promise<UserCreationDTO> {
    const headers = {
      Authorization: oauthToken,
    };
    try {
      const response = await axios.get(this.clusterUrl + '/users/' + id, {
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
}
