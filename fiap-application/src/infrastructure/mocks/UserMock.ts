import { ProductCategory } from '../../core/domain/enums/ProductCategory';
import { OrderStatus } from '../../core/domain/enums/OrderStatus';
import { Order } from '../../core/domain/entities/Order';
import { CPF } from '../../core/domain/valueObjects/Cpf';
import { Money } from '../../core/domain/valueObjects/Money';
import { OrderEntity } from '../adapters/gateway/entity/OrderEntity';
import { OrderEntityStatus } from '../adapters/gateway/enums/OrderEntityStatus';
import User from '../../core/domain/entities/User';
import { UserEntity } from '../adapters/gateway/entity/UserEntity';
import { UserCreationDTO } from '../../core/application/dto/UserCreationDTO';
import { UserUpdateDTO } from '../../core/application/dto/UserUpdateDTO';
import { UserResponseDTO } from '../../core/application/dto/UserResponseDTO';

export class UserMock {
  public static async getUser(): Promise<User> {
    const userMock: User = {
      id: '42',
      email: 'test@test.com',
      name: 'test untario',
      cpf: await CPF.create('123456789'),
      phone: '123456789',
      createdAt: new Date('2024-01-26T17:41:00Z'),
      updatedAt: new Date('2024-01-26T17:41:00Z'),
    };
    return userMock;
  }

  public static getUserEntity(): UserEntity {
    return {
      _id: '123',
      name: 'Test User',
      email: 'test@example.com',
      cpf: '123456789',
      phone: '1234567890',
      createdAt: new Date('2024-01-26T17:41:00Z'),
      updatedAt: new Date('2024-01-26T17:41:00Z'),
    };
  }

  public static getUserEntityList(): UserEntity[] {
    return [
      {
        _id: '123',
        name: 'Test User 1',
        email: 'test1@example.com',
        cpf: '123456789',
        phone: '1234567890',
        createdAt: new Date('2024-01-23T17:41:00Z'),
        updatedAt: new Date('2024-01-25T17:41:00Z'),
      },
      {
        _id: '456',
        name: 'Test User 2',
        email: 'test2@example.com',
        cpf: '987654321',
        phone: '0987654321',
        createdAt: new Date('2024-01-26T17:41:00Z'),
        updatedAt: new Date('2024-01-26T17:41:00Z'),
      },
    ];
  }

  public static getUserCreationDTO(): UserCreationDTO {
    return {
      id: 'dbad9ae5-92d0-493f-bbbb-10895f3c15e9',
      name: 'Fulano Beltrano',
      email: 'fulanob@gmail.com',
      cpf: '59370565078',
      phone: '11987896525',
      createdAt: new Date('2024-01-26T17:41:00Z'),
      updatedAt: new Date('2024-01-26T17:41:00Z'),
    };
  }

  public static getUserUpdateDTO(): UserUpdateDTO {
    return {
      name: 'Fulano Beltrano',
      email: 'fulanob2@gmail.com',
      phone: '11987896525',
      updatedAt: new Date('2024-01-26T17:41:00Z'),
    };
  }
  public static async getUserList(): Promise<User[]> {
    const userMock: User[] = [
      {
        id: '42',
        email: 'test@test.com',
        name: 'test untario',
        cpf: await CPF.create('123456789'),
        phone: '123456789',
        createdAt: new Date('2024-01-26T17:41:00Z'),
        updatedAt: new Date('2024-01-26T17:41:00Z'),
      },
    ];
    return userMock;
  }
}
