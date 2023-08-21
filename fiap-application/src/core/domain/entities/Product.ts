import { ProductCategory } from '../enums/ProductCategory';
import { Money } from '../valueObjects/Money';

export default class Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: Money;
  createdAt: Date;
  category: ProductCategory;

  constructor(id: string) {
    this.id = id;
  }
}
