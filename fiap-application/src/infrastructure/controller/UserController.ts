import { IConnection } from '../../core/application/repositories/IConnection';
import UserGateway from '../adapters/gateway/UserGateway';
import UserUseCase from '../../core/application/usecase/UserUseCase';
import { UserAdapter } from '../../core/application/adapter/UserAdapter';
import { UserFilterDTO } from '../../core/application/dto/UserFilterDTO';
import { UserCreationDTO } from '../../core/application/dto/UserCreationDTO';
import { IUserGateway } from '../../core/application/repositories/IUserGateway';

export class UserController {
  static async getAllUsers(params: UserFilterDTO, dbconnection: IConnection) {
    const userGateway: IUserGateway = new UserGateway(dbconnection);
    const allUsers = await UserUseCase.getAllUsers(params, userGateway);

    const adapted = UserAdapter.toResponseList(allUsers);
    return adapted;
  }

  static async createUser(body: UserCreationDTO, dbconnection: IConnection) {
    const userGateway: IUserGateway = new UserGateway(dbconnection);
    const userBody = await UserAdapter.toDomain(body);
    const user = await UserUseCase.createUser(userBody, userGateway);

    const adapted = UserAdapter.toResponse(user);
    return adapted;
  }

  static async getUserById(id: string, dbconnection: IConnection) {
    const userGateway = new UserGateway(dbconnection);
    const user = await UserUseCase.getUserById(id, userGateway);

    const adapted = UserAdapter.toResponse(user);
    return adapted;
  }

  static async updateUser(
    id: string,
    body: UserCreationDTO,
    dbconnection: IConnection,
  ) {
    const userGateway = new UserGateway(dbconnection);
    const userBody = await UserAdapter.toDomain(body);
    const user = await UserUseCase.updateUser(id, userBody, userGateway);

    const adapted = UserAdapter.toResponse(user);
    return adapted;
  }
}
