import { Injectable, Inject } from '@nestjs/common';
import { IOrderRepository } from '../../domain/repositories/IOrderRepository';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import Decimal from 'decimal.js';
import { OrderCreationDTO } from '../dto/OrderCreationDTO';
import { OrderStatus } from '../../domain/entities/OrderStatus';

@Injectable()
export default class OrderService {
  constructor(
    @Inject('IOrderRepository') private orderRepository: IOrderRepository,
    @Inject('IProductRepository') private productRepository: IProductRepository,
  ) {}

  public async createOrder(orderCreationDTO: OrderCreationDTO) {
    const order = {
      id: null,
      createdAt: new Date(),
      status: OrderStatus.RECEIVED,
      customer: orderCreationDTO.customer,
      extraItems: orderCreationDTO.extraItems,
      total: new Decimal(0),
      items: [],
    };
    for (const item of orderCreationDTO.items) {
      const orderItem = {
        product: await this.productRepository.getById(item.productId),
        observation: item.observation,
        quantity: item.quantity,
      };
      order.items.push(orderItem);
      order.total = order.total.plus(
        new Decimal(orderItem.product.price.value).mul(orderItem.quantity),
      );
    }
    return this.orderRepository.create(order);
  }

  public getAllOrders() {
    return this.orderRepository.getAll();
  }

  public getOrderById(id) {
    return this.orderRepository.getById(id);
  }

  public updateOrder(id, order) {
    return this.orderRepository.update(id, order);
  }
}
