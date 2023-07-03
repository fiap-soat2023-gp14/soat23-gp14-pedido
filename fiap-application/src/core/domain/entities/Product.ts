import { Price } from "../valueObjects/Price";

export default interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: Price;
  createdAt: Date;
  category: ProductCategory;
}
