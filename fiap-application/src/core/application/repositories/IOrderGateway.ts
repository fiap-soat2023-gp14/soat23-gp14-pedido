import { Order } from '../../domain/entities/Order';

export interface IOrderGateway {
  getAll(params?): Promise<Order[]>;
  getById(id: string): Promise<Order>;
  getSorted(params?): Promise<Order[]>;
  create(order: Order): Promise<Order>;
  updateStatus(id: string, order: Order): Promise<Order>;
  removeUserData(userId: string): Promise<void>;
}
