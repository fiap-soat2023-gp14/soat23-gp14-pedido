import { OrderStatus } from '../enums/OrderStatus';
import { Money } from '../valueObjects/Money';
import Product from './Product';
import User from './User';

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
  total: Money;
  extraItems: string;
  createdAt: Date;
  deliveredAt: Date;
}
