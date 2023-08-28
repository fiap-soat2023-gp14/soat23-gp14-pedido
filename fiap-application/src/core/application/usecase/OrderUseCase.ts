import { Order } from 'src/core/domain/entities/Order';
import { IOrderGateway } from '../repositories/IOrderGateway';

export default class OrderUseCase {
  public static async getOrderById(
    id: string,
    gateway: IOrderGateway,
  ): Promise<Order> {
    return await gateway.getById(id);
  }

  public static async getAllOrders(
    params: any,
    gateway: IOrderGateway,
  ): Promise<Array<Order>> {
    return await gateway.getAll(params);
  }

  public static async createOrder(
    order: Order,
    gateway: IOrderGateway,
  ): Promise<Order> {
    return await gateway.create(order);
  }

  public static async updateOrder(
    id: string,
    order: Order,
    gateway: IOrderGateway,
  ): Promise<Order> {
    return await gateway.update(id, order);
  }

  public static async getSortedOrders(
    params: any,
    gateway: IOrderGateway,
  ): Promise<Array<Order>> {
    return await gateway.getSorted(params);
  }
}
