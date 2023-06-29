import { Inject, Injectable } from '@nestjs/common';
import ProductRepository from '../../../infrastructure/adapters/repository/ProductRepository';

@Injectable()
export default class ProductService {
  constructor(
    @Inject('IProductRepository') private productRepository: ProductRepository,
  ) {}

  public getProductById(id) {
    return this.productRepository.getById(id);
  }

  public getAllProducts() {
    return this.productRepository.getAll();
  }

  public createProduct(product) {
    return this.productRepository.create(product);
  }

  public updateProduct(id, product) {
    return this.productRepository.update(id, product);
  }
  public deleteProduct(id) {
    return this.productRepository.delete(id);
  }
}
