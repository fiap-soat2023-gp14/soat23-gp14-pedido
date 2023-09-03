import { IUserGateway } from 'src/core/application/repositories/IUserGateway';
import { UserFilterDTO } from '../dto/UserFilterDTO';
import User from '../../domain/entities/User';
import { ConflictException } from '@nestjs/common';
import { HttpNotFoundException } from '../../../infrastructure/exceptions/HttpNotFoundException';

export default class UserUseCase {
  static async createUser(user: User, userGateway: IUserGateway) {
    await user.cpf.validate();

    const params: UserFilterDTO = new UserFilterDTO();
    params.cpf = user.cpf.value;
    const userExist = await this.getAllUsers(params, userGateway);

    if (userExist.length > 0) {
      throw new ConflictException('User already exists');
    }

    return await userGateway.create(user);
  }
  static async getAllUsers(params: UserFilterDTO, userGateway: IUserGateway) {
    return await userGateway.getAll(params);
  }

  public static async getUserById(id: string, userGateway: IUserGateway) {
    const userResponse = await userGateway.getById(id);
    if (!userResponse)
      throw new HttpNotFoundException(`User with id ${id} not found`);
    return userResponse;
  }

  public static async updateUser(
    id: string,
    user: User,
    userGateway: IUserGateway,
  ) {
    const userValidate = await this.getUserById(id, userGateway);
    return userGateway.update(id, user);
  }
}
