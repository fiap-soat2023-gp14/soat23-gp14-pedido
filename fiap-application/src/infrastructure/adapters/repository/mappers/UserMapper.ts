import { v4 } from 'uuid';
import User from 'src/core/domain/entities/User';
import { CPF } from 'src/core/domain/valueObjects/Cpf';
import { UserEntity } from '../entity/UserEntity';

export default class UserMapper {
  static async toDomain(user: UserEntity): Promise<User> {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      cpf: await CPF.isValidCPF(user.cpf),
      createdAt: user.createdAt || new Date(),
      updatedAt: user.updatedAt || new Date()
    }
  }

  static toEntity(user: User): UserEntity {
    return {
      id: user.id || v4(),
      name: user.name,
      email: user.email,
      cpf: user.cpf.value,
      phone: user.phone,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}