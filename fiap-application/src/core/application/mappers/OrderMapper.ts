import { Order, OrderItem } from '../../domain/entities/Order';
import { OrderCreationDTO } from '../dto/OrderCreationDTO';
import { OrderStatus } from '../../domain/enums/OrderStatus';
import {
  OrderItemResponseDTO,
  OrderResponseDTO,
} from '../dto/OrderResponseDTO';
import ProductMapper from './ProductMapper';
import { UserMapper } from './UserMapper';
import { Money } from '../../domain/valueObjects/Money';

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
      customer: UserMapper.toResponse(order.customer),
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
      product: ProductMapper.toDTO(item.product),
      observation: item.observation,
      quantity: item.quantity,
    };
  }

  private static itemsToDTO(items: OrderItem[]): OrderItemResponseDTO[] {
    return items.map((item) => this.itemToDTO(item));
  }
}
