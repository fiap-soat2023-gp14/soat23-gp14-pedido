import Decimal from 'decimal.js';
import { Order, OrderItem } from '../../../../core/domain/entities/Order';
import { OrderStatus } from '../../../../core/domain/entities/OrderStatus';

export class OrderEntity implements Order {
  id: string;
  status: OrderStatus;
  customer: string;
  extraItems: string;
  items: OrderItem[];
  total: Decimal;
  createdAt: Date;
  deliveredAt: Date;
}

export class OrderItemEntity implements OrderItem {
  product: Product;
  observation: string;
  quantity: number;
}
