import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { IOrderRepository } from '../repositories/IOrderRepository';
import { IProductRepository } from '../repositories/IProductRepository';
import Decimal from 'decimal.js';
import { OrderCreationDTO } from '../dto/OrderCreationDTO';
import OrderMapper from '../mappers/OrderMapper';
import { IUserRepository } from '../repositories/IUserRepository';
import { IPaymentGateway } from '../external/IPaymentGateway';
import * as Http from 'http';

@Injectable()
export default class OrderService {
  constructor(
    @Inject('IOrderRepository') private orderRepository: IOrderRepository,
    @Inject('IProductRepository') private productRepository: IProductRepository,
    @Inject('IUserRepository') private userRepository: IUserRepository,
    @Inject('IPaymentGateway') private paymentGateway: IPaymentGateway,
  ) {}

  public async createOrder(orderCreationDTO: OrderCreationDTO) {
    const order = OrderMapper.toDomain(orderCreationDTO);

    if (orderCreationDTO.customerCPF) {
      order.customer = await this.userRepository.getByCpf(
        orderCreationDTO.customerCPF,
      );
    }

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

    const paymentSuccessful = await this.paymentGateway.processPayment(
      order.total,
    );
    if (paymentSuccessful) {
      console.info('Payment successful');
      return OrderMapper.toDTO(await this.orderRepository.create(order));
    } else {
      console.error('Payment failed');
      throw new HttpException('Payment failed', HttpStatus.BAD_GATEWAY);
    }
  }

  public getAllOrders() {
    return this.orderRepository.getAll();
  }

  public async getOrderById(id) {
    const order = await this.orderRepository.getById(id);
    return OrderMapper.toDTO(order);
  }

  public updateOrder(id, order) {
    return this.orderRepository.update(id, order);
  }
}
