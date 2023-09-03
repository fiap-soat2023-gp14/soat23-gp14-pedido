import { IsNotEmpty, IsString } from 'class-validator';

export class PaymentMetadataDTO {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class PaymentFeedbackDTO {
  id: number;
  @IsString()
  @IsNotEmpty()
  type: string;
  dateCreated: Date;
  @IsString()
  @IsNotEmpty()
  status: string;
  @IsNotEmpty()
  data: PaymentMetadataDTO;
}