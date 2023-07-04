import { Money } from "../valueObjects/Money";

export default interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: Money;
  createdAt: Date;
  category: ProductCategory;
}
