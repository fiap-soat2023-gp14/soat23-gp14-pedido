import UserFilter from '../../domain/entities/UserFilter';
import User from '../../domain/entities/User';
export interface IUserRepository {
  getAll(params: UserFilter): Promise<User[]>;
  getById(id: string): Promise<User>;
  create(user: User): Promise<User>;
  update(id: string, user: User): Promise<User>;
}
