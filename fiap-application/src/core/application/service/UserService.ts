import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/core/domain/repositories/IUserRepository';
import { UserCreationDTO } from '../dto/UserCreationDTO';
import { UserUpdateDTO } from '../dto/UserUpdateDTO';

@Injectable()
export default class UserService {
  constructor(
    @Inject('IUserRepository') private userRepository: IUserRepository,
  ) {}

  public createUser(userCreationDTO: UserCreationDTO) {
    const user = {
      createdAt: new Date(),
      updatedAt: new Date(),
      ...userCreationDTO,
    };
    return this.userRepository.create(user);
  }

  public getAllUsers() {
    return this.userRepository.getAll();
  }

  public getUserById(id) {
    return this.userRepository.getById(id);
  }

  public getUserByCpf(cpf) {
    return this.userRepository.getByCpf(cpf);
  }

  public updateUser(id, userUpdateDto: UserUpdateDTO) {
    const user = {
      updatedAt: new Date(),
      ...userUpdateDto,
    };

    return this.updateUser(id, user);
  }
}
