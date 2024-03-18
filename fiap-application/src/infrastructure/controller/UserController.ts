import { IConnection } from '../adapters/external/IConnection';
import { IOrderGateway } from '../../core/application/repositories/IOrderGateway';
import OrderGateway from '../adapters/gateway/OrderGateway';
import { IUserGateway } from '../../core/application/repositories/IUserGateway';
import UserGateway from '../adapters/gateway/UserGateway';

export class UserController {
  async removeUserData(
    id: string,
    oauthToken: string,
    dbConnection: IConnection,
  ): Promise<void> {
    try {
      const orderGateway: IOrderGateway = new OrderGateway(dbConnection);
      await orderGateway.removeUserData(id);
      const userGateway: IUserGateway = new UserGateway();
      await userGateway.removeUserById(id, oauthToken);
    } catch (e) {
      console.error(e);
    }
  }
}
