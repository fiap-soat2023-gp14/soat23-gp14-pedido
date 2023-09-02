import User from 'src/core/domain/entities/User';
import { CPF } from 'src/core/domain/valueObjects/Cpf';
import { v4 } from 'uuid';
import { UserEntity } from '../entity/UserEntity';

export default class UserMapper {
  static async toDomain(user: UserEntity): Promise<User> {
    return {
      id: user._id || v4(),
      name: user.name,
      email: user.email,
      phone: user.phone,
      cpf: await CPF.create(user.cpf), //TODO: Fix this
      createdAt: user.createdAt || new Date(),
      updatedAt: user.updatedAt || new Date(),
    };
  }

  static toEntity(user: User): UserEntity {
    return {
      _id: user.id || v4(),
      name: user.name,
      email: user.email,
      cpf: user.cpf.value,
      phone: user.phone,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  static async toDomainList(users: UserEntity[]): Promise<User[]> {
    return Promise.all(users.map((user) => this.toDomain(user)));
  }
}
