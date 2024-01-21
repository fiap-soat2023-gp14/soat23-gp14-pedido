import Product from '../../domain/entities/Product';

export interface IProductGateway {
  getById(id: string): Promise<Product>;
}
