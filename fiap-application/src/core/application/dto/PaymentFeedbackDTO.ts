import { IsNotEmpty, IsString } from 'class-validator';

export class PaymentMetadataDTO {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class PaymentFeedbackDTO {
  id: string;
  @IsString()
  @IsNotEmpty()
  type: string;
  @IsString()
  @IsNotEmpty()
  status: string;
  @IsNotEmpty()
  data: PaymentMetadataDTO;
}
