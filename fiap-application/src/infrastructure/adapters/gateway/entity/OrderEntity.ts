import { OrderStatus } from '../../../../core/domain/enums/OrderStatus';
import { UserEntity } from './UserEntity';
import { OrderEntityStatus } from "../enums/OrderEntityStatus";

export class OrderEntity {
  _id: string;
  status: OrderEntityStatus;
  customer: UserEntity;
  extraItems: string;
  items: OrderItemEntity[];
  total: number;
  createdAt: Date;
  deliveredAt: Date;
}

export class OrderItemEntity {
  product: ProductEntity;
  observation: string;
  quantity: number;
}
