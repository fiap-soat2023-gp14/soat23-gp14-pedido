import { UserEntity } from '../entity/UserEntity';

export class UserMapper {
  static toEntity(user: User): UserEntity {
    return {
      id: undefined,
      name: user.name,
      email: user.email,
      cpf: user.cpf,
      phone: user.phone,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  static toDomain(user: UserEntity): User {
    return {
      name: user.name,
      email: user.email,
      cpf: user.cpf,
      phone: user.phone,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
