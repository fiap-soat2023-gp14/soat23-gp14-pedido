import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/core/application/repositories/IUserRepository';
import { UserCreationDTO } from '../dto/UserCreationDTO';
import { UserUpdateDTO } from '../dto/UserUpdateDTO';
import { UserMapper } from '../mappers/UserMapper';

@Injectable()
export default class UserService {
  constructor(
    @Inject('IUserRepository') private userRepository: IUserRepository,
  ) { }

  public async createUser(userCreationDTO: UserCreationDTO) {
    const user = await UserMapper.toDomain(userCreationDTO)
    return this.userRepository.create(user);
  }

  public async getAllUsers() {
    return UserMapper.toResponseList(await this.userRepository.getAll());
  }

  public async getUserById(id) {
    return UserMapper.toResponse(await this.userRepository.getById(id));
  }

  public async getUserByCpf(cpf) {
    return UserMapper.toResponse(await this.userRepository.getByCpf(cpf));
  }

  public async updateUser(id, userDto: UserCreationDTO) {
    const user = await UserMapper.toDomain(userDto);
    return this.userRepository.update(id, user)
  }
}
