import { Order, OrderItem } from '../../domain/entities/Order';
import { OrderStatus } from '../../domain/enums/OrderStatus';
import { OrderCreationDTO } from '../dto/OrderCreationDTO';
import {
  OrderItemResponseDTO,
  OrderResponseDTO,
} from '../dto/OrderResponseDTO';
import ProductAdapter from './ProductAdapter';
import { UserAdapter } from './UserAdapter';

export default class OrderMapper {
  static async toDomain(orderCreationDTO: OrderCreationDTO): Promise<Order> {
    return {
      id: null,
      customer: undefined,
      deliveredAt: undefined,
      createdAt: new Date(),
      status: OrderStatus.RECEIVED,
      extraItems: orderCreationDTO.extraItems,
      total: undefined,
      items: [],
    };
  }

  static toDTO(order: Order): OrderResponseDTO {
    console.log(order);
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

  private static itemsToDTO(items: OrderItem[]): OrderItemResponseDTO[] {
    return items.map((item) => this.itemToDTO(item));
  }

  static toDTOList(orders: Order[]): OrderResponseDTO[] {
    return orders.map((order) => this.toDTO(order));
  }
}
