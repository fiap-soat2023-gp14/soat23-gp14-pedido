import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class OrderItemCreationDTO {
  @IsNotEmpty()
  @IsString()
  productId: string;
  @IsNumber({ maxDecimalPlaces: 0, allowNaN: false, allowInfinity: false })
  quantity: number;
  @IsString()
  observation: string;
}

export class OrderCreationDTO {
  @IsString()
  @IsOptional()
  customerCPF: string;
  @IsNotEmpty()
  items: OrderItemCreationDTO[];
  @IsString()
  @IsOptional()
  extraItems: string;
}
