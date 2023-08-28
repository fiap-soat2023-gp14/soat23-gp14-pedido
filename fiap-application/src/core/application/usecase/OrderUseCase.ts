import { Order } from 'src/core/domain/entities/Order';
import { IOrderGateway } from '../repositories/IOrderGateway';
import { HttpNotFoundException } from '../../../infrastructure/exceptions/HttpNotFoundException';
import { OrderStatus } from '../../domain/enums/OrderStatus';
import UserUseCase from './UserUseCase';
import { IUserGateway } from '../repositories/IUserGateway';
import ProductUseCase from './ProductUseCase';
import { IProductGateway } from '../repositories/IProductGateway';
import { Money } from '../../domain/valueObjects/Money';
import { HttpException, HttpStatus } from '@nestjs/common';

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
    orderGateway: IOrderGateway,
    userGateway: IUserGateway,
    productGateway: IProductGateway,
  ): Promise<Order> {
    if (order.customer && order.customer.id) {
      order.customer = await UserUseCase.getUserById(
        order.customer.id,
        userGateway,
      );
    }

    let total = 0;
    for (let i = 0; i < order.items.length; i++) {
      const item = order.items[i];
      const orderItem = {
        product: await ProductUseCase.getProductById(
          item.product.id,
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
    //
    // const paymentSuccessful = await this.paymentGateway.processPayment(
    //   order.total.value,
    // );

    const paymentSuccessful = true; //TODO: change to PaymentUseCase
    if (paymentSuccessful) {
      console.info('Payment successful');
      return await orderGateway.create(order);
    } else {
      console.error('Payment failed');
      throw new HttpException('Payment failed', HttpStatus.BAD_GATEWAY);
    }
  }

  public static async updateOrder(
    id: string,
    status: OrderStatus,
    gateway: IOrderGateway,
  ): Promise<Order> {
    const order = await this.getOrderById(id, gateway);
    return await gateway.updateStatus(id, order);
    if (!order)
      throw new HttpNotFoundException(`Order with id ${id} not found`);

    order.status = status;
    if (order.status === OrderStatus.FINISHED) {
      order.deliveredAt = new Date();
    }
    return await gateway.update(id, order);
  }

  public static async getSortedOrders(
    params: any,
    gateway: IOrderGateway,
  ): Promise<Array<Order>> {
    return await gateway.getSorted(params);
  }
}
