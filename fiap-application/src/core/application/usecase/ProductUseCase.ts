import Product from '../../domain/entities/Product';
import { IProductGateway } from '../repositories/IProductGateway';

export default class ProductUseCase {
  public static async getProductById(
    id: string,
    productGateway: IProductGateway,
  ): Promise<Product> {
    return await productGateway.getById(id);
  }

  public static async getAllProducts(
    params: any,
    productGateway: IProductGateway,
  ) {
    return await productGateway.getAll(params);
  }

  public static async createProduct(
    product: Product,
    productGateway: IProductGateway,
  ) {
    return await productGateway.create(product);
  }

  public static async updateProduct(
    id: string,
    product: Product,
    productGateway: IProductGateway,
  ) {
    await productGateway.update(id, product);
    return product;
  }
  public static async deleteProduct(
    id: string,
    productGateway: IProductGateway,
  ) {
    return await productGateway.delete(id);
  }
}
