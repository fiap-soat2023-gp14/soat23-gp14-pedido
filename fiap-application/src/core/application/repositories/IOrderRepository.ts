import { Order } from '../../domain/entities/Order';

export interface IOrderRepository {
  create(order: Order): Promise<Order>;
  getAll(params?): Promise<Order[]>;
  getOrdersOrdered(params?): Promise<Order[]>;
  getById(id: string): Promise<Order>;
  update(id: string, order: Order): Promise<Order>;
}
