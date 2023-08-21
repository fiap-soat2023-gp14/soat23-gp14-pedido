import { ProductCategory } from 'src/core/domain/enums/ProductCategory';

export interface ProductEntity {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  createdAt: Date;
  category: ProductCategory; //FIXME: é correto importar direto o core/domain ou deixar generico (string)?
}
