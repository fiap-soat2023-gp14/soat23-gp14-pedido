import { IsNotEmpty, IsString } from 'class-validator';
import { OrderStatus } from '../../domain/enums/OrderStatus';

export class OrderStatusUpdateDTO {
  @IsNotEmpty()
  @IsString()
  id: string;
  @IsNotEmpty()
  @IsString()
  status: OrderStatus;
}
