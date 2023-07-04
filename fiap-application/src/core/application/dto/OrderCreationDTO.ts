import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class OrderItemCreationDTO {
  @IsNotEmpty()
  @IsString()
  productId: string;
  @IsInt()
  quantity: number;
  @IsString()
  observation: string;
}

export class OrderCreationDTO {
  @IsString()
  @IsOptional()
  customerId: string;
  @IsNotEmpty()
  items: OrderItemCreationDTO[];
  @IsString()
  @IsOptional()
  extraItems: string;
}
