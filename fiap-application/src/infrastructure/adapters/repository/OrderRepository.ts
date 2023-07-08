import { Inject, Injectable } from '@nestjs/common';
import { IOrderRepository } from '../../../core/application/repositories/IOrderRepository';
import { Order } from '../../../core/domain/entities/Order';
import MongoDBAdapter from '../../MongoDBAdapter';
import { HttpNotFoundException } from '../../exceptions/HttpNotFoundException';
import { OrderEntity } from './entity/OrderEntity';
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

  public async getAll(queryParam?): Promise<Array<Order>> {
    const query = queryParam ? { ...queryParam } : {};
    const orders: Array<OrderEntity> = this.mongoDbAdapter
        .getCollection(this.COLLECTION_NAME)
        .find(query)
        .sort({createdAt: +1})
        .toArray();

    return Promise.resolve(OrderMapper.toDomainList(orders));
  }

  public async getById(id: string): Promise<Order> {
    const order: OrderEntity = await this.mongoDbAdapter
      .getCollection(this.COLLECTION_NAME)
      .findOne({ _id: id });

    if (!order)
      throw new HttpNotFoundException(`Order with id ${id} not found`);
    return Promise.resolve(OrderMapper.toDomain(order));
  }

  update(id: string, order: Order): Promise<Order> {
    return Promise.resolve(undefined);
  }
}
