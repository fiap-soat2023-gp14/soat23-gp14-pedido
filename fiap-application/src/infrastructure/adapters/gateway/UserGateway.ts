import { ConflictException } from '@nestjs/common';
import { IUserGateway } from 'src/core/application/repositories/IUserGateway';
import User from 'src/core/domain/entities/User';
import UserFilter from 'src/core/domain/entities/UserFilter';
import { HttpNotFoundException } from 'src/infrastructure/exceptions/HttpNotFoundException';
import { UserEntity } from './entity/UserEntity';
import UserMapper from './mappers/UserMapper';
import { IConnection } from '../../../core/application/repositories/IConnection';
import { CPF } from "../../../core/domain/valueObjects/Cpf";

export default class UserGateway implements IUserGateway {
  private COLLECTION_NAME = 'Users';
  private dbConnection: IConnection;
  constructor(dataBase: IConnection) {
    this.dbConnection = dataBase;
  }

  public async create(user: User): Promise<User> {
    const userEntity = UserMapper.toEntity(user);
    const userExist = await this.dbConnection
      .getCollection(this.COLLECTION_NAME)
      .findOne({ cpf: user.cpf.value });

    if (userExist) {
      throw new ConflictException('User already exists');
    }

    try {
      await this.dbConnection
        .getCollection(this.COLLECTION_NAME)
        .insertOne(userEntity);
      console.log('User created successfully.');
      return UserMapper.toDomain(userEntity);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  public async getAll(params: UserFilter): Promise<User[]> {
    const filter = params ? params : {};
    const users: UserEntity[] = await this.dbConnection
      .getCollection(this.COLLECTION_NAME)
      .find(filter)
      .toArray();

    return await UserMapper.toDomainList(users);
  }

  public async getById(id: string): Promise<User> {
    const userResponse = await this.dbConnection
      .getCollection(this.COLLECTION_NAME)
      .findOne({ _id: id });
    if (!userResponse)
      throw new HttpNotFoundException(`User with id ${id} not found`);
    return UserMapper.toDomain(userResponse);
  }

  public async update(id: string, user: User): Promise<User> {
    const userValidate = await this.getById(id);//TODO: Move to UseCase
    if (!userValidate)
      throw new HttpNotFoundException(`User with id ${id} not found`);
    try {
      const userEntity = UserMapper.toEntity(user);
      delete userEntity._id;
      const updateUser = {
        $set: { ...userEntity },
      };
      await this.dbConnection
        .getCollection(this.COLLECTION_NAME)
        .updateOne({ _id: id }, updateUser);

      return UserMapper.toDomain(userEntity);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
}