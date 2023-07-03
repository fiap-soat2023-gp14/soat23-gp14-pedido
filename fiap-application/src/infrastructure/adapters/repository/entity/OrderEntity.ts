import Decimal from 'decimal.js';
import { Order, OrderItem } from '../../../../core/domain/entities/Order';
import { OrderStatus } from '../../../../core/domain/entities/OrderStatus';

export class OrderEntity {
  id: string;
  status: OrderStatus;
  customer: string;
  extraItems: string;
  items: OrderItem[];
  total: Decimal;
  createdAt: Date;
  deliveredAt: Date;
}

export class OrderItemEntity {
  product: ProductEntity;
  observation: string;
  quantity: number;
}
