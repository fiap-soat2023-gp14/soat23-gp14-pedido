import { ProductCategory } from '../../core/domain/enums/ProductCategory';
import { OrderStatus } from '../../core/domain/enums/OrderStatus';
import { Order } from '../../core/domain/entities/Order';
import { CPF } from '../../core/domain/valueObjects/Cpf';
import { Money } from '../../core/domain/valueObjects/Money';
import { OrderEntity } from '../adapters/gateway/entity/OrderEntity';
import { OrderEntityStatus } from '../adapters/gateway/enums/OrderEntityStatus';
import User from '../../core/domain/entities/User';
import { UserEntity } from '../adapters/gateway/entity/UserEntity';

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
      createdAt: new Date(),
      updatedAt: new Date(),
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
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: '456',
        name: 'Test User 2',
        email: 'test2@example.com',
        cpf: '987654321',
        phone: '0987654321',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }
}
