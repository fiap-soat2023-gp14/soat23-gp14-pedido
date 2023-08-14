import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Money } from '../../domain/valueObjects/Money';
import { OrderCreationDTO } from '../dto/OrderCreationDTO';
import { IPaymentGateway } from '../external/IPaymentGateway';
import OrderMapper from '../mappers/OrderMapper';
import { IOrderRepository } from '../repositories/IOrderRepository';
import { IProductRepository } from '../repositories/IProductRepository';
import { IUserRepository } from '../repositories/IUserRepository';
import { OrderStatus } from '../../domain/enums/OrderStatus';

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

  public async getAllOrders(params?) {
    return OrderMapper.toDTOList(await this.orderRepository.getAll(params));
  }

  public async getOrdersOrdered(){
    return OrderMapper.toDTOList(await this.orderRepository.getOrdersOrdered());
  }

  public async getOrderById(id) {
    const order = await this.orderRepository.getById(id);
    return OrderMapper.toDTO(order);
  }

  public async updateOrder(id, status: OrderStatus) {
    const order = await this.orderRepository.getById(id);
    order.status = status;
    if (order.status === OrderStatus.FINISHED) {
      order.deliveredAt = new Date();
    }
    return OrderMapper.toDTO(await this.orderRepository.update(id, order));
  }
}
