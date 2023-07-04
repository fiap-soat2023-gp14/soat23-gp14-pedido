import Decimal from 'decimal.js';
import { OrderItem } from '../../../../core/domain/entities/Order';
import { OrderStatus } from '../../../../core/domain/enums/OrderStatus';
import { UserEntity } from './UserEntity';

export class OrderEntity {
  _id: string;
  status: OrderStatus;
  customer: UserEntity;
  extraItems: string;
  items: OrderItemEntity[];
  total: Decimal;
  createdAt: Date;
  deliveredAt: Date;
}

export class OrderItemEntity {
  product: ProductEntity;
  observation: string;
  quantity: number;
}
