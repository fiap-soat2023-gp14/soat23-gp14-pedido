import { OrderStatus } from '../../domain/enums/OrderStatus';
import ProductDTO from './ProductDTO';
import { UserResponseDTO } from './UserResponseDTO';

export class OrderItemResponseDTO {
  product: ProductDTO;
  quantity: number;
  observation: string;
}

export class OrderResponseDTO {
  id: string;
  status: OrderStatus;
  customer: UserResponseDTO;
  items: OrderItemResponseDTO[];
  extraItems: string;
  createdAt: Date;
  deliveredAt: Date;
  total: number;
}
