import { IUserGateway } from 'src/core/application/repositories/IUserGateway';
import { HttpNotFoundException } from '../../../infrastructure/exceptions/HttpNotFoundException';

export default class UserUseCase {
  public static async getUserById(
    id: string,
    oauthToken: string,
    userGateway: IUserGateway,
  ) {
    const userResponse = await userGateway.getById(id, oauthToken);
    if (!userResponse)
      throw new HttpNotFoundException(`User with id ${id} not found`);
    return userResponse;
  }
}
