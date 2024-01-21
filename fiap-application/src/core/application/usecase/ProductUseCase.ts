import Product from '../../domain/entities/Product';
import { IProductGateway } from '../repositories/IProductGateway';
import { HttpNotFoundException } from '../../../infrastructure/exceptions/HttpNotFoundException';
import ProductAdapter from '../adapter/ProductAdapter';

export default class ProductUseCase {
  public static async getProductById(
    id: string,
    oauthToken: string,
    productGateway: IProductGateway,
  ): Promise<Product> {
    const product = await productGateway.getById(id, oauthToken);
    if (!product)
      throw new HttpNotFoundException(`Product with id ${id} not found`);
    return ProductAdapter.toDomain(product);
  }
}
