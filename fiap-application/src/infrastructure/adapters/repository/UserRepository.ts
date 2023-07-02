import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/core/domain/repositories/IUserRepository';
import MongoDBAdapter from 'src/infrastructure/MongoDBAdapter';
import { v4 } from 'uuid';
import { HttpNotFoundException } from 'src/infrastructure/exceptions/HttpNotFoundException';

@Injectable()
export default class UserRepository implements IUserRepository {
  constructor(
    @Inject('MongoDBAdapter') private mongoDbAdaptar: MongoDBAdapter,
  ) { }

  COLLECTION = this.mongoDbAdaptar.getCollection('Users');

  public async create(user: User): Promise<User> {
    const userEntity = { ...user, _id: v4() };
    const userExist = await this.COLLECTION.findOne({ cpf: user.cpf });

    if (userExist) {
      throw new HttpNotFoundException('User already exists'); //trocar o erro
    }

    try {
      const userCreated = await this.COLLECTION.insertOne(userEntity);
      console.log('User created successfully.');

      return userCreated;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  public async getAll(): Promise<User[]> {
    return this.COLLECTION.find().toArray();
  }

  public async getById(id: string): Promise<User> {
    return await this.COLLECTION.findOne({ _id: id });
  }

  public async getByCpf(cpf: string): Promise<User> {
    return await this.COLLECTION.find({ 'cpf': cpf });
  }

  public async update(id: string, user: User): Promise<User> {
    try {
      const updateUser = {
        $set: { _id: id, ...user },
      };
      return await this.COLLECTION.updateOne({ _id: id }, updateUser);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
}
