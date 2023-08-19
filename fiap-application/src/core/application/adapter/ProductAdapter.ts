import ProductDTO from '../dto/ProductDTO';
import { Money } from '../../domain/valueObjects/Money';
import Product from '../../domain/entities/Product';
export default class ProductAdapter {
  static async toDomain(productDTO: ProductDTO): Promise<Product> {
    const product = {
      id: productDTO.id,
      name: productDTO.name,
      description: productDTO.description,
      price: await Money.create(productDTO.price),
      category: productDTO.category,
      imageUrl: productDTO.imageUrl,
      createdAt: productDTO.createdAt || new Date(),
    };
    return Promise.resolve(product);
  }

  static toDTOList(products: Product[]): ProductDTO[] {
    return products.map((product) => this.toDTO(product));
  }

  static toDTO(product: Product): ProductDTO {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price.value,
      category: product.category,
      imageUrl: product.imageUrl,
      createdAt: product.createdAt,
    };
  }
}
