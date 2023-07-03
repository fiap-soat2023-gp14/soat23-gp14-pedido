import Decimal from 'decimal.js';
import { OrderStatus } from './OrderStatus';
import Product from './Product';
export interface OrderItem {
  product: Product;
  observation?: string;
  quantity: number;
}

export interface Order {
  id: string;
  status: OrderStatus;
  items: OrderItem[];
  customer: string; // TODO: change to Client
  total: Decimal;
  extraItems?: string; // TODO: verify whether we need to have condiments as extra items in a structured way
  createdAt: Date;
  deliveredAt?: Date;
}
