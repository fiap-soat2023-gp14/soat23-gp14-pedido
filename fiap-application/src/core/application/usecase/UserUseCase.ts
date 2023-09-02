import { IUserGateway } from 'src/core/application/repositories/IUserGateway';
import { UserFilterDTO } from '../dto/UserFilterDTO';
import User from '../../domain/entities/User';
import UserMapper from '../../../infrastructure/adapters/gateway/mappers/UserMapper';
import { ConflictException } from '@nestjs/common';

export default class UserUseCase {
  static async createUser(user: User, userGateway: IUserGateway) {
    user.cpf.validate();

    const params: UserFilterDTO = new UserFilterDTO();
    params.cpf = user.cpf.value;
    const userExist = await this.getAllUsers(params, userGateway);

    if (userExist) {
      throw new ConflictException('User already exists');
    }

    return await userGateway.create(user);
  }
  static async getAllUsers(params: UserFilterDTO, userGateway: IUserGateway) {
    return await userGateway.getAll(params);
  }

  public static async getUserById(id: string, userGateway: IUserGateway) {
    return await userGateway.getById(id);
  }

  public static async updateUser(
    id: string,
    user: User,
    userGateway: IUserGateway,
  ) {
    return userGateway.update(id, user);
  }
}
