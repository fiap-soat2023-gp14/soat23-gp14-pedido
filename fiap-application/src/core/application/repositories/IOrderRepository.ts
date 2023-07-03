import { Order } from '../../domain/entities/Order';

export interface IOrderRepository {
  create(order: Order): Promise<Order>;
  getAll(): Promise<Order[]>; //TODO: add filter by status
  getById(id: string): Promise<Order>;
  update(id: string, order: Order): Promise<Order>;
}
