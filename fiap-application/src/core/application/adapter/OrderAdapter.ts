import { Order, OrderItem } from '../../domain/entities/Order';
import { OrderStatus } from '../../domain/enums/OrderStatus';
import { OrderCreationDTO } from '../dto/OrderCreationDTO';
import {
  OrderItemResponseDTO,
  OrderResponseDTO,
} from '../dto/OrderResponseDTO';
import ProductAdapter from './ProductAdapter';
import { UserAdapter } from './UserAdapter';
import User from '../../domain/entities/User';

export default class OrderAdapter {
  static async toDomain(orderCreationDTO: OrderCreationDTO): Promise<Order> {
    const orderItemList = orderCreationDTO.items.map((item) => {
      return OrderItem.create(item.productId, item.observation, item.quantity);
    });
    const customer = orderCreationDTO.customerId
      ? new User(orderCreationDTO.customerId)
      : null;
    return {
      id: null,
      customer: customer,
      deliveredAt: undefined,
      createdAt: new Date(),
      status: OrderStatus.RECEIVED,
      extraItems: orderCreationDTO.extraItems,
      total: undefined,
      items: orderItemList,
    };
  }

  static toDTO(order: Order): OrderResponseDTO {
    return {
      id: order.id,
      customer: order.customer
        ? UserAdapter.toResponse(order.customer)
        : undefined,
      createdAt: order.createdAt,
      deliveredAt: order.deliveredAt,
      extraItems: order.extraItems,
      items: this.itemsToDTO(order.items),
      status: order.status,
      total: order.total.value,
    };
  }

  private static itemToDTO(item: OrderItem): OrderItemResponseDTO {
    return {
      product: ProductAdapter.toDTO(item.product),
      observation: item.observation,
      quantity: item.quantity,
    };
  }

  static itemsToDTO(items: OrderItem[]): OrderItemResponseDTO[] {
    return items.map((item) => this.itemToDTO(item));
  }

  static toDTOList(orders: Order[]): OrderResponseDTO[] {
    return orders.map((order) => this.toDTO(order));
  }
}
