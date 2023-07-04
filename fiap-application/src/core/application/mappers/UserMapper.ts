import { UserResponseDTO } from '../dto/UserResponseDTO';

export class UserMapper {
  static toDTO(user: User): UserResponseDTO {
    return {
      name: user.name,
      email: user.email,
      cpf: user.cpf,
      phone: user.phone,
    };
  }
}
