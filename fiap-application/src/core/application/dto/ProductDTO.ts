import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class ProductDTO {
  id: string;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsString()
  description: string;
  imageUrl: string;
  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  price: number;
  @IsNotEmpty()
  category: ProductCategory;
  createdAt: Date;
}
