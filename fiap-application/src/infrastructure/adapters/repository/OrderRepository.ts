import { IOrderRepository } from '../../../core/application/repositories/IOrderRepository';
import { Inject, Injectable } from '@nestjs/common';
import MongoDBAdapter from '../../MongoDBAdapter';
import { Order } from '../../../core/domain/entities/Order';
import { OrderMapper } from './mappers/OrderMapper';

@Injectable()
export default class OrderRepository implements IOrderRepository {
  COLLECTION_NAME = 'Orders';

  constructor(
    @Inject('IMongoDBAdapter') private mongoDbAdapter: MongoDBAdapter,
  ) {}
  public async create(order: Order): Promise<Order> {
    const orderEntity = OrderMapper.toEntity(order);

    try {
      await this.mongoDbAdapter
        .getCollection(this.COLLECTION_NAME)
        .insertOne(orderEntity);
      console.log('Order created successfully.');
      return Promise.resolve(OrderMapper.toDomain(orderEntity));
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  getAll(): Promise<Order[]> {
    return this.mongoDbAdapter
      .getCollection(this.COLLECTION_NAME)
      .find({})
      .toArray();
  }

  getById(id: string): Promise<Order> {
    return this.mongoDbAdapter
      .getCollection(this.COLLECTION_NAME)
      .findOne({ _id: id });
  }

  update(id: string, order: Order): Promise<Order> {
    return Promise.resolve(undefined);
  }
}
