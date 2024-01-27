import { ProductCategory } from '../../core/domain/enums/ProductCategory';
import { OrderStatus } from '../../core/domain/enums/OrderStatus';
import { Order } from '../../core/domain/entities/Order';
import { CPF } from '../../core/domain/valueObjects/Cpf';
import { Money } from '../../core/domain/valueObjects/Money';
import { OrderEntity } from '../adapters/gateway/entity/OrderEntity';
import { OrderEntityStatus } from '../adapters/gateway/enums/OrderEntityStatus';

export class OrderMock {
  public static async getOrder(): Promise<Order> {
    const orderMock: Order = {
      id: '1',
      customer: {
        id: '42',
        email: 'test@test.com',
        name: 'test untario',
        cpf: await CPF.create('123456789'),
        phone: '123456789',
        createdAt: new Date('2024-01-26T17:41:00Z'),
        updatedAt: new Date('2024-01-26T17:41:00Z'),
      },
      createdAt: new Date('2024-01-26T17:41:00Z'),
      deliveredAt: new Date('2024-01-26T17:41:00Z'),
      extraItems: undefined,
      items: [
        {
          product: {
            id: '3',
            name: 'test product',
            description: 'only unit test',
            imageUrl: 'http://imagetest.com.png',
            price: await Money.create(100),
            category: ProductCategory.SANDWICH,
            createdAt: new Date('2024-01-26T17:41:00Z'),
          },
          observation: undefined,
          quantity: 1,
        },
      ],
      status: OrderStatus.RECEIVED,
      total: await Money.create(100),
    };
    return orderMock;
  }

  public static getOrderEntity(): OrderEntity {
    return {
      _id: '1',
      customer: {
        _id: '42',
        email: 'test@test.com',
        name: 'test untario',
        cpf: '123456789',
        phone: '123456789',
        createdAt: new Date('2024-01-26T17:41:00Z'),
        updatedAt: new Date('2024-01-26T17:41:00Z'),
      },
      createdAt: new Date('2024-01-26T17:41:00Z'),
      deliveredAt: new Date('2024-01-26T17:41:00Z'),
      extraItems: undefined,
      items: [
        {
          product: {
            _id: '3',
            name: 'test product',
            description: 'only unit test',
            imageUrl: 'http://imagetest.com.png',
            price: 100,
            category: ProductCategory.SANDWICH,
            createdAt: new Date('2024-01-26T17:41:00Z'),
          },
          observation: undefined,
          quantity: 1,
        },
      ],
      status: OrderEntityStatus.RECEIVED,
      total: 100,
    };
  }
}
