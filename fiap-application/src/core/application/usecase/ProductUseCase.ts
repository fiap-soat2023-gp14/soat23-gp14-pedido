import Product from '../../domain/entities/Product';
import { IProductGateway } from '../repositories/IProductGateway';
import { HttpNotFoundException } from '../../../infrastructure/exceptions/HttpNotFoundException';

export default class ProductUseCase {
  public static async getProductById(
    id: string,
    productGateway: IProductGateway,
  ): Promise<Product> {
    const product = await productGateway.getById(id);
    if (!product)
      throw new HttpNotFoundException(`Product with id ${id} not found`);
    return product;
  }
}
