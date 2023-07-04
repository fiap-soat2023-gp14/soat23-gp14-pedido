import { Order, OrderItem } from '../../../../core/domain/entities/Order';
import { OrderEntity, OrderItemEntity } from '../entity/OrderEntity';
import { v4 } from 'uuid';
import UserMapper from './UserMapper';
import ProductMapper from './ProductMapper';
import { Money } from '../../../../core/domain/valueObjects/Money';

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
      total: order.total.value,
      items: this.toOrderItemEntityList(order.items),
    };
  }

  static async toDomain(orderEntity: OrderEntity): Promise<Order> {
    return {
      id: orderEntity._id,
      customer: orderEntity.customer
        ? await UserMapper.toDomain(orderEntity.customer)
        : undefined,
      deliveredAt: orderEntity.deliveredAt,
      createdAt: orderEntity.createdAt,
      status: orderEntity.status,
      extraItems: orderEntity.extraItems,
      total: await Money.create(orderEntity.total),
      items: await this.toOrderItemList(orderEntity.items),
    };
  }

  static async toOrderItem(
    orderItemEntity: OrderItemEntity,
  ): Promise<OrderItem> {
    return {
      product: await ProductMapper.toDomain(orderItemEntity.product),
      observation: orderItemEntity.observation,
      quantity: orderItemEntity.quantity,
    };
  }

  static async toOrderItemList(
    orderItemEntityList: OrderItemEntity[],
  ): Promise<OrderItem[]> {
    return Promise.all(
      orderItemEntityList.map((orderItemEntity) =>
        this.toOrderItem(orderItemEntity),
      ),
    );
  }

  static toOrderItemEntity(orderItemEntity: OrderItem): OrderItemEntity {
    return {
      product: ProductMapper.toEntity(orderItemEntity.product),
      observation: orderItemEntity.observation,
      quantity: orderItemEntity.quantity,
    };
  }

  static toOrderItemEntityList(
    orderItemEntityList: OrderItem[],
  ): OrderItemEntity[] {
    return orderItemEntityList.map((orderItemEntity) =>
      this.toOrderItemEntity(orderItemEntity),
    );
  }
}
