interface ProductEntity {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  createdAt: Date;
  category: ProductCategory;
}
