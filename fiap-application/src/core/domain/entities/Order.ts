import { OrderStatus } from '../enums/OrderStatus';
import Product from './Product';
import User from './User';
import { Money } from '../valueObjects/Money';
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
