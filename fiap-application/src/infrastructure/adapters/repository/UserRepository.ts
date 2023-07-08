import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from 'src/core/application/repositories/IUserRepository';
import User from 'src/core/domain/entities/User';
import UserFilter from 'src/core/domain/entities/UserFilter';
import MongoDBAdapter from 'src/infrastructure/MongoDBAdapter';
import { HttpNotFoundException } from 'src/infrastructure/exceptions/HttpNotFoundException';
import { UserEntity } from './entity/UserEntity';
import UserMapper from './mappers/UserMapper';

@Injectable()
export default class UserRepository implements IUserRepository {
  constructor(
    @Inject('IMongoDBAdapter') private mongoDbAdaptar: MongoDBAdapter,
  ) {}

  COLLECTION = this.mongoDbAdaptar.getCollection('Users');

  public async create(user: User): Promise<User> {
    const userEntity = UserMapper.toEntity(user);
    const userExist = await this.COLLECTION.findOne({ cpf: user.cpf.value });

    if (userExist) {
      throw new ConflictException('User already exists');
    }

    try {
      await this.COLLECTION.insertOne(userEntity);
      console.log('User created successfully.');

      return UserMapper.toDomain(userEntity);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  public async getAll(params: UserFilter): Promise<User[]> {
    const filter = params ? params : {};
    const users: UserEntity[] = await this.COLLECTION.find(filter).toArray();

    return await UserMapper.toDomainList(users);
  }

  public async getById(id: string): Promise<User> {
    const userResponse = await this.COLLECTION.findOne({ id: id });
    if (!userResponse)
      throw new HttpNotFoundException(`User with id ${id} not found`);
    return UserMapper.toDomain(userResponse);
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
