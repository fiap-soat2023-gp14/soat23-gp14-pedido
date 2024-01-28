import { Order } from 'src/core/domain/entities/Order';
import { IOrderGateway } from '../repositories/IOrderGateway';
import { HttpNotFoundException } from '../../../infrastructure/exceptions/HttpNotFoundException';
import { OrderStatus } from '../../domain/enums/OrderStatus';
import UserUseCase from './UserUseCase';
import { IUserGateway } from '../repositories/IUserGateway';
import ProductUseCase from './ProductUseCase';
import { IProductGateway } from '../repositories/IProductGateway';
import { Money } from '../../domain/valueObjects/Money';
import { UserAdapter } from '../adapter/UserAdapter';

export default class OrderUseCase {
  public static async getOrderById(
    id: string,
    gateway: IOrderGateway,
  ): Promise<Order> {
    const order = await gateway.getById(id);

    if (!order)
      throw new HttpNotFoundException(`Order with id ${id} not found`);
    await order.total.validate();
    return order;
  }

  public static async getAllOrders(
    params: any,
    gateway: IOrderGateway,
  ): Promise<Array<Order>> {
    return await gateway.getAll(params);
  }

  public static async createOrder(
    order: Order,
    oauthToken: string,
    orderGateway: IOrderGateway,
    userGateway: IUserGateway,
    productGateway: IProductGateway
  ): Promise<Order> {
    if (order.customer && order.customer.id) {
      const customerDTo = await UserUseCase.getUserById(
        order.customer.id,
        oauthToken,
        userGateway,
      );
      order.customer = await UserAdapter.toDomain(customerDTo);
    }

    let total = 0;
    for (let i = 0; i < order.items.length; i++) {
      const item = order.items[i];
      const orderItem = {
        product: await ProductUseCase.getProductById(
          item.product.id,
          oauthToken,
          productGateway,
        ),
        observation: item.observation,
        quantity: item.quantity,
      };
      order.items[i] = orderItem;
      total = total + orderItem.product.price.value * orderItem.quantity;
    }

    order.total = await Money.create(total);
    await order.total.validate();
    const createdOrder = await orderGateway.create(order);
    return createdOrder;
  }

  public static async updateOrder(
    id: string,
    status: OrderStatus,
    gateway: IOrderGateway,
  ): Promise<Order> {
    const order = await this.getOrderById(id, gateway);
    order.status = status;
    if (order.status === OrderStatus.FINISHED) {
      order.deliveredAt = new Date();
    }
    return await gateway.updateStatus(id, order);
  }

  public static async getSortedOrders(
    params: any,
    gateway: IOrderGateway,
  ): Promise<Array<Order>> {
    return await gateway.getSorted(params);
  }
}
