import { Order, OrderItem } from '../../domain/entities/Order';
import { OrderCreationDTO } from '../dto/OrderCreationDTO';
import { OrderStatus } from '../../domain/enums/OrderStatus';
import Decimal from 'decimal.js';
import {
  OrderItemResponseDTO,
  OrderResponseDTO,
} from '../dto/OrderResponseDTO';
import ProductMapper from './ProductMapper';

export default class OrderMapper {
  static toDomain(orderCreationDTO: OrderCreationDTO): Order {
    return {
      id: null,
      customer: undefined,
      deliveredAt: undefined,
      createdAt: new Date(),
      status: OrderStatus.RECEIVED,
      extraItems: orderCreationDTO.extraItems,
      total: new Decimal(0),
      items: [],
    };
  }

  static toDTO(order: Order): OrderResponseDTO {
    console.log(order);
    return {
      id: order.id,
      customer: order.customer,
      createdAt: order.createdAt,
      deliveredAt: order.deliveredAt,
      extraItems: order.extraItems,
      items: this.itemsToDTO(order.items),
      status: order.status,
      total: order.total.toString(),
    };
  }

  private static itemToDTO(item: OrderItem): OrderItemResponseDTO {
    return {
      product: ProductMapper.toDTO(item.product),
      observation: item.observation,
      quantity: item.quantity,
    };
  }

  private static itemsToDTO(items: OrderItem[]): OrderItemResponseDTO[] {
    return items.map((item) => this.itemToDTO(item));
  }
}
