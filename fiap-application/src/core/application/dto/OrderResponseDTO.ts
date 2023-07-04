import { UserResponseDTO } from './UserResponseDTO';
import ProductDTO from './ProductDTO';
import { OrderStatus } from '../../domain/enums/OrderStatus';

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
  total: string;
}
