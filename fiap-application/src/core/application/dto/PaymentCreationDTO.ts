import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PaymentCreationDTO {
  @IsNotEmpty()
  @IsString()
  externalId: string;
  @IsNotEmpty()
  @IsNumber()
  amount: number;
  @IsNotEmpty()
  @IsString()
  installments: number;
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNotEmpty()
  @IsString()
  paymentMethodId: string;
  @IsNotEmpty()
  @IsString()
  payerEmail: string;
  @IsNotEmpty()
  @IsString()
  notificationUrl: string;

}
