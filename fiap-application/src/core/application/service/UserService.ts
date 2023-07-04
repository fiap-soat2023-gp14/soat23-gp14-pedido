import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/core/application/repositories/IUserRepository';
import { UserCreationDTO } from '../dto/UserCreationDTO';
import { UserMapper } from '../mappers/UserMapper';
import { UserFilterDTO } from '../dto/UserFilterDTO';

@Injectable()
export default class UserService {
  constructor(
    @Inject('IUserRepository') private userRepository: IUserRepository,
  ) {}

  public async createUser(userCreationDTO: UserCreationDTO) {
    const user = await UserMapper.toDomain(userCreationDTO);
    const userResponse = await this.userRepository.create(user);
    return UserMapper.toResponse(userResponse);
  }

  public async getAllUsers(params: UserFilterDTO) {
    return UserMapper.toResponseList(await this.userRepository.getAll(params));
  }

  public async getUserById(id) {
    return UserMapper.toResponse(await this.userRepository.getById(id));
  }

  public async updateUser(id, userDto: UserCreationDTO) {
    const user = await UserMapper.toDomain(userDto);
    return this.userRepository.update(id, user);
  }
}
