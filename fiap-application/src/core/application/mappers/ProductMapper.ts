
import ProductDTO from '../dto/ProductDTO';
export default class ProductMapper {
  static toDomain(productDTO: ProductDTO): Product {
    return {
      id: productDTO.id,
      name: productDTO.name,
      description: productDTO.description,
      price: productDTO.price,
      category: productDTO.category,
      imageUrl: productDTO.imageUrl,
      createdAt: productDTO.createdAt || new Date(),
    };
  }

  static toDTOList(products: Product[]): ProductDTO[] {
    return products.map((product) => this.toDTO(product));
  }

  static toDTO(product: Product): ProductDTO {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      imageUrl: product.imageUrl,
      createdAt: product.createdAt,
    };
  }
}
