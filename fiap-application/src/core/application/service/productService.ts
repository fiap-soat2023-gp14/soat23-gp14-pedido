import { Inject, Injectable } from '@nestjs/common';
import ProductRepository from "../../../infrastructure/adapters/repository/productRepository";

@Injectable()
export default class ProductService {
  constructor(
    @Inject('ProductRepository') private productRepository: ProductRepository,
  ) {}

  public getProductById(id) {
    return this.productRepository.getById(id);
  }

  public createProduct(product) {
    return this.productRepository.create(product);
  }
}
