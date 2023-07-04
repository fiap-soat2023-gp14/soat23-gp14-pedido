import { Order } from '../../../../core/domain/entities/Order';
import { OrderEntity } from '../entity/OrderEntity';
import { UserMapper } from './UserMapper';
import { v4 } from 'uuid';

export class OrderMapper {
  static toEntity(order: Order): OrderEntity {
    return {
      _id: order.id || v4(),
      customer: order.customer
        ? UserMapper.toEntity(order.customer)
        : undefined,
      deliveredAt: order.deliveredAt,
      createdAt: order.createdAt,
      status: order.status,
      extraItems: order.extraItems,
      total: order.total,
      items: order.items,
    };
  }

  static toDomain(orderEntity: OrderEntity): Order {
    return {
      id: orderEntity._id,
      customer: orderEntity.customer
        ? UserMapper.toDomain(orderEntity.customer)
        : undefined,
      deliveredAt: orderEntity.deliveredAt,
      createdAt: orderEntity.createdAt,
      status: orderEntity.status,
      extraItems: orderEntity.extraItems,
      total: orderEntity.total,
      items: orderEntity.items,
    };
  }
}
