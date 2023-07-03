import { v4 } from 'uuid';

export default class ProductMapper {
  static toDomain(product: ProductEntity): Product {
    return {
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      imageUrl: product.imageUrl,
      createdAt: product.createdAt || new Date(),
    };
  }

  static toDomainList(products: ProductEntity[]): Product[] {
    return products.map((product) => ProductMapper.toDomain(product));
  }
  static toEntity(product: Product): ProductEntity {
    return {
      _id: product.id || v4(),
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      imageUrl: product.imageUrl,
      createdAt: product.createdAt,
    };
  }
}
