import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/core/application/repositories/IUserRepository';
import UserMapper from './mappers/UserMapper';
import User from 'src/core/domain/entities/User';
import MongoDBAdapter from 'src/infrastructure/MongoDBAdapter';
import { HttpNotFoundException } from 'src/infrastructure/exceptions/HttpNotFoundException';

@Injectable()
export default class UserRepository implements IUserRepository {
  constructor(
    @Inject('IMongoDBAdapter') private mongoDbAdaptar: MongoDBAdapter,
  ) { }

  COLLECTION = this.mongoDbAdaptar.getCollection('Users');

  public async create(user: User): Promise<User> {
    const userEntity = UserMapper.toEntity(user);
    const userExist = await this.COLLECTION.findOne({ cpf: user.cpf });

    if (userExist) {
      throw new HttpNotFoundException('User already exists');
    }

    try {
      const userCreated = await this.COLLECTION.insertOne(userEntity);
      console.log('User created successfully.');

      return UserMapper.toDomain(userCreated);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  public async getAll(): Promise<User[]> {
    return this.COLLECTION.find().toArray();
  }

  public async getById(id: string): Promise<User> {
    return await this.COLLECTION.findOne({ id: id });
  }

  public async getByCpf(cpf: string): Promise<User> {

    const userResponse = await this.COLLECTION.findOne({ cpf: cpf });
    if (!userResponse) throw new Error(`User with cpf ${cpf} not found`);

    return await this.COLLECTION.findOne({ cpf: cpf });
  }

  public async update(id: string, user: User): Promise<User> {
    const userValidate = await this.getById(id);
    if (!userValidate) throw new Error(`User with id ${id} not found`);
    try {
      const userEntity = UserMapper.toEntity(user);
      delete userEntity.id;
      const updateUser = {
        $set: { ...userEntity },
      };
      return await this.COLLECTION.updateOne({ id: id }, updateUser);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
}
