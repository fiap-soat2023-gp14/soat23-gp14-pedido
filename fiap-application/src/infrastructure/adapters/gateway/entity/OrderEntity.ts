import { OrderEntityStatus } from '../enums/OrderEntityStatus';
import { ProductEntity } from './ProductEntity';
import { UserEntity } from './UserEntity';

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
