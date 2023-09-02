import { v4 } from 'uuid';
import { Order, OrderItem } from '../../../../core/domain/entities/Order';
import { Money } from '../../../../core/domain/valueObjects/Money';
import { OrderEntity, OrderItemEntity } from '../entity/OrderEntity';
import ProductMapper from './ProductMapper';
import UserMapper from './UserMapper';
import { OrderStatus } from '../../../../core/domain/enums/OrderStatus';
import { OrderEntityStatus } from '../enums/OrderEntityStatus';

export class OrderMapper {
  static toEntity(order: Order): OrderEntity {
    return {
      _id: order.id || v4(),
      customer: order.customer
        ? UserMapper.toEntity(order.customer)
        : undefined,
      deliveredAt: order.deliveredAt,
      createdAt: order.createdAt,
      status: OrderEntityStatus[order.status],
      extraItems: order.extraItems,
      total: order.total.value,
      items: this.toOrderItemEntityList(order.items),
    };
  }

  static toOrderItemEntity(orderItemEntity: OrderItem): OrderItemEntity {
    return {
      product: ProductMapper.toEntity(orderItemEntity.product),
      observation: orderItemEntity.observation,
      quantity: orderItemEntity.quantity,
    };
  }

  static toOrderItemEntityList(
    orderItemDomainList: OrderItem[],
  ): OrderItemEntity[] {
    return orderItemDomainList.map((orderItemEntity) =>
      this.toOrderItemEntity(orderItemEntity),
    );
  }

  static async toDomain(orderEntity: OrderEntity): Promise<Order> {
    return {
      id: orderEntity._id,
      customer: orderEntity.customer
        ? await UserMapper.toDomain(orderEntity.customer)
        : undefined,
      deliveredAt: orderEntity.deliveredAt,
      createdAt: orderEntity.createdAt,
      status: OrderStatus[OrderEntityStatus[orderEntity.status]],
      extraItems: orderEntity.extraItems,
      total: await Money.create(orderEntity.total),
      items: await this.toDomainOrderItemList(orderEntity.items),
    };
  }

  static async toDomainList(orders: Array<OrderEntity>): Promise<Order[]> {
    return Promise.all(orders.map((order) => this.toDomain(order)));
  }

  static async toDomainOrderItem(
    orderItemEntity: OrderItemEntity,
  ): Promise<OrderItem> {
    return {
      product: await ProductMapper.toDomain(orderItemEntity.product),
      observation: orderItemEntity.observation,
      quantity: orderItemEntity.quantity,
    };
  }

  static async toDomainOrderItemList(
    orderItemEntityList: OrderItemEntity[],
  ): Promise<OrderItem[]> {
    return Promise.all(
      orderItemEntityList.map((orderEntityItem) =>
        this.toDomainOrderItem(orderEntityItem),
      ),
    );
  }

  static async toStatusEntity(status: OrderStatus): Promise<OrderEntityStatus> {
    return OrderEntityStatus[status];
  }
}
