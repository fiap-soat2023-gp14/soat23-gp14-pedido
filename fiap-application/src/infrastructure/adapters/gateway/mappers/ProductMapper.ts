import Product from 'src/core/domain/entities/Product';
import { v4 } from 'uuid';
import { Money } from '../../../../core/domain/valueObjects/Money';
import { ProductEntity } from '../entity/ProductEntity';
export default class ProductMapper {
  static async toDomain(product: ProductEntity): Promise<Product> {
    return {
      id: product._id,
      name: product.name,
      description: product.description,
      price: await Money.create(product.price),
      category: product.category,
      imageUrl: product.imageUrl,
      createdAt: product.createdAt || new Date(),
    };
  }

  static async toDomainList(products: ProductEntity[]): Promise<Product[]> {
    return Promise.all(products.map((product) => this.toDomain(product)));
  }

  static toEntity(product: Product): ProductEntity {
    return {
      _id: product.id || v4(),
      name: product.name,
      description: product.description,
      price: product.price.value,
      category: product.category,
      imageUrl: product.imageUrl,
      createdAt: product.createdAt,
    };
  }
}
