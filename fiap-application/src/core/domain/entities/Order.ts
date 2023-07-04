import Decimal from 'decimal.js';
import { OrderStatus } from '../enums/OrderStatus';
import Product from './Product';
export interface OrderItem {
  product: Product;
  observation: string;
  quantity: number;
}

export interface Order {
  id: string;
  status: OrderStatus;
  items: OrderItem[];
  customer: User;
  total: Decimal;
  extraItems: string;
  createdAt: Date;
  deliveredAt: Date;
}
