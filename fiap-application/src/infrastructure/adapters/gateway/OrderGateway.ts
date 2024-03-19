import { IConnection } from '../external/IConnection';
import { IOrderGateway } from '../../../core/application/repositories/IOrderGateway';
import { Order } from '../../../core/domain/entities/Order';
import { OrderEntity } from './entity/OrderEntity';
import { OrderMapper } from './mappers/OrderMapper';

export default class OrderGateway implements IOrderGateway {
  COLLECTION_NAME = 'Orders';
  private dbConnection: IConnection;
  constructor(database: IConnection) {
    this.dbConnection = database;
  }

  public async create(order: Order): Promise<Order> {
    const orderEntity = OrderMapper.toEntity(order);

    try {
      await this.dbConnection
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
    if (queryParam && queryParam.status) {
      queryParam.status = await OrderMapper.toStatusEntity(queryParam.status);
    }
    const query = queryParam
      ? {
          ...queryParam,
        }
      : {};
    const orders: Array<OrderEntity> = await this.dbConnection
      .getCollection(this.COLLECTION_NAME)
      .find(query)
      .sort({ createdAt: +1 })
      .toArray();

    return Promise.resolve(OrderMapper.toDomainList(orders));
  }

  public async getSorted(): Promise<Array<Order>> {
    const orders: Array<OrderEntity> = await this.dbConnection
      .getCollection(this.COLLECTION_NAME)
      .find({ $or: [{ status: 1 }, { status: 4 }, { status: 5 }] })
      .sort({ status: -1 }, { createdAt: +1 })
      .toArray();

    return Promise.resolve(OrderMapper.toDomainList(orders));
  }

  public async getById(id: string): Promise<Order> {
    const order: OrderEntity = await this.dbConnection
      .getCollection(this.COLLECTION_NAME)
      .findOne({ _id: id });

    if (order) return Promise.resolve(OrderMapper.toDomain(order));

    return Promise.resolve(null);
  }

  public async updateStatus(id: string, order: Order): Promise<Order> {
    const orderEntity = OrderMapper.toEntity(order);
    try {
      const updateOrder = {
        $set: {
          status: orderEntity.status,
          deliveredAt: orderEntity.deliveredAt,
        },
      };
      await this.dbConnection
        .getCollection(this.COLLECTION_NAME)
        .updateOne({ _id: id }, updateOrder);
      console.log('Order updated successfully.');
      return Promise.resolve(order);
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  }

  async removeUserData(userId: string): Promise<void> {
    const emptyData = 'DADO REMOVIDO';
    const emptyCPF = '00000000000';

    const filter = { 'customer._id': userId };
    const updateDoc = {
      $set: {
        'customer.name': emptyData,
        'customer.email': emptyData,
        'customer.cpf': emptyCPF,
        'customer.phone': emptyData,
      },
    };
    try {
      await this.dbConnection
        .getCollection(this.COLLECTION_NAME)
        .updateMany(filter, updateDoc);
      console.log('Orders updated successfully.');
    } catch (error) {
      console.error('Error updating orders:', error);
      throw error;
    }
  }
}
