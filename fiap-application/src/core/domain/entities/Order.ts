import { OrderStatus } from '../enums/OrderStatus';
import { Money } from '../valueObjects/Money';
import Product from './Product';
import User from './User';

export class OrderItem {
  product: Product;
  observation: string;
  quantity: number;

  constructor(productId: string, observation: string, quantity: number) {
    this.product = new Product(productId);
    this.observation = observation;
    this.quantity = quantity;
  }

  public static create(
    productId: string,
    observation: string,
    quantity: number,
  ) {
    return new OrderItem(productId, observation, quantity);
  }
}

export class Order {
  id: string;
  status: OrderStatus;
  items: OrderItem[];
  customer: User;
  total: Money;
  extraItems: string;
  createdAt: Date;
  deliveredAt: Date;
}
