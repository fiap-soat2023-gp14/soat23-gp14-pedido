import Product from '../../domain/entities/Product';
export interface IProductRepository {
  getAll(): Promise<Product[]>;
  getById(id: string): Promise<Product>;
  create(product: Product): Promise<Product>;
  delete(id: string): Promise<void>;
  update(id: string, product: Product): Promise<Product>;
}
