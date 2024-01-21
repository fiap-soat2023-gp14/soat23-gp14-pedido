import { IUserGateway } from 'src/core/application/repositories/IUserGateway';
import axios from 'axios';
import { UserCreationDTO } from 'src/core/application/dto/UserCreationDTO';

export default class UserGateway implements IUserGateway {
  private userUrl: string;
  constructor() {
    this.userUrl = process.env.CLUSTER_URL;
  }

  public async getById(
    id: string,
    oauthToken: string,
  ): Promise<UserCreationDTO> {
    const headers = {
      Authorization: oauthToken,
    };
    console.log(' header: ', headers);
    try {
      const response = await axios.get(this.userUrl + '/users/' + id, {
        headers,
      });

      console.log('Status code:', response.status);
      if (response.status != 200) {
        return Promise.resolve(null);
      } else {
        console.log(response.data);
      }

      if (!response) return Promise.resolve(null);

      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.resolve(null);
    }
  }
}
