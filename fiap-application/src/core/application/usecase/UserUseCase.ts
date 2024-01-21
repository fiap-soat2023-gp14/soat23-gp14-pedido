import { IUserGateway } from 'src/core/application/repositories/IUserGateway';
import { UserFilterDTO } from '../dto/UserFilterDTO';
import User from '../../domain/entities/User';
import { ConflictException } from '@nestjs/common';
import { HttpNotFoundException } from '../../../infrastructure/exceptions/HttpNotFoundException';

export default class UserUseCase {
  public static async getUserById(
    id: string,
    oauthToken: string,
    userGateway: IUserGateway,
  ) {
    const userResponse = await userGateway.getById(id, oauthToken);
    console.log('user response', userResponse);
    if (!userResponse)
      throw new HttpNotFoundException(`User with id ${id} not found`);
    return userResponse;
  }
}
