import { IUserGateway } from 'src/core/application/repositories/IUserGateway';
import User from 'src/core/domain/entities/User';
import UserMapper from './mappers/UserMapper';
import axios from 'axios';

export default class UserGateway implements IUserGateway {
  private userUrl: string;
  constructor() {
    this.userUrl = process.env.CLUSTER_URL;
  }

  public async getById(id: string): Promise<User> {
    const oauthToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

    const headers = {
      Authorization: 'Bearer ' + oauthToken,
    };

    const response = await axios.get(this.userUrl + '/users/' + id, {
      headers,
    });

    if (response.status === 200) {
      console.log(response.data);
    } else {
      console.log(response.status, response.statusText);
    }
    // const userResponse = await this.dbConnection
    //   .getCollection(this.COLLECTION_NAME)
    //   .findOne({ _id: id });

    // if (!userResponse) return Promise.resolve(null);

    return await UserMapper.toDomain(null);
  }
}
