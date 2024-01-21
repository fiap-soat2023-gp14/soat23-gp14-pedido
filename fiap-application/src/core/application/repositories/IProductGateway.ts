import Product from '../../domain/entities/Product';
import ProductDTO from '../dto/ProductDTO';

export interface IProductGateway {
  getById(id: string, oauthToken: string): Promise<ProductDTO>;
}
