import User from '../../domain/entities/User';
export interface IUserGateway {
  getById(id: string): Promise<User>;
}
