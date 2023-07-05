import { Order } from '../../domain/entities/Order';

export interface IOrderRepository {
  create(order: Order): Promise<Order>;
  getAll(params?): Promise<Order[]>; //FIXME: need params?
  getById(id: string): Promise<Order>;
  update(id: string, order: Order): Promise<Order>;
}
