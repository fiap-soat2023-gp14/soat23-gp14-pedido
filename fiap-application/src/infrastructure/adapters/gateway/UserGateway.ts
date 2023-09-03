import { IUserGateway } from 'src/core/application/repositories/IUserGateway';
import User from 'src/core/domain/entities/User';
import UserFilter from 'src/core/domain/entities/UserFilter';
import { UserEntity } from './entity/UserEntity';
import UserMapper from './mappers/UserMapper';
import { IConnection } from '../external/IConnection';

export default class UserGateway implements IUserGateway {
  private COLLECTION_NAME = 'Users';
  private dbConnection: IConnection;
  constructor(dataBase: IConnection) {
    this.dbConnection = dataBase;
  }

  public async create(user: User): Promise<User> {
    const userEntity = UserMapper.toEntity(user);
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

    if (!userResponse) return Promise.resolve(null);

    return await UserMapper.toDomain(userResponse);
  }

  public async update(id: string, user: User): Promise<User> {
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
