import { UserCreationDTO } from '../dto/UserCreationDTO';

export interface IUserGateway {
  getById(id: string, oauthToken: string): Promise<UserCreationDTO>;
  removeUserById(id: string, oauthToken: string): Promise<void>;
}
