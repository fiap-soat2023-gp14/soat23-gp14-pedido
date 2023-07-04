import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { IOrderRepository } from '../repositories/IOrderRepository';
import { IProductRepository } from '../repositories/IProductRepository';
import { OrderCreationDTO } from '../dto/OrderCreationDTO';
import OrderMapper from '../mappers/OrderMapper';
import { IUserRepository } from '../repositories/IUserRepository';
import { IPaymentGateway } from '../external/IPaymentGateway';
import { Money } from '../../domain/valueObjects/Money';

@Injectable()
export default class OrderService {
  constructor(
    @Inject('IOrderRepository') private orderRepository: IOrderRepository,
    @Inject('IProductRepository') private productRepository: IProductRepository,
    @Inject('IUserRepository') private userRepository: IUserRepository,
    @Inject('IPaymentGateway') private paymentGateway: IPaymentGateway,
  ) {}

  public async createOrder(orderCreationDTO: OrderCreationDTO) {
    const order = await OrderMapper.toDomain(orderCreationDTO);

    if (orderCreationDTO.customerId) {
      order.customer = await this.userRepository.getById(
        orderCreationDTO.customerId,
      );
    }

    let total = 0;
    for (const item of orderCreationDTO.items) {
      const orderItem = {
        product: await this.productRepository.getById(item.productId),
        observation: item.observation,
        quantity: item.quantity,
      };
      order.items.push(orderItem);
      total = total + orderItem.product.price.value * orderItem.quantity;
    }
    order.total = await Money.create(total);

    const paymentSuccessful = await this.paymentGateway.processPayment(
      order.total.value,
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
