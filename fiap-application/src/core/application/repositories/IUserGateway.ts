import { UserCreationDTO } from '../dto/UserCreationDTO';

export interface IUserGateway {
  getById(id: string, oauthToken: string): Promise<UserCreationDTO>;
}
