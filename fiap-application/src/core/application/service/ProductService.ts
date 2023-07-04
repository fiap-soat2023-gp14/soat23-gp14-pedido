import { Inject, Injectable } from '@nestjs/common';
import ProductRepository from '../../../infrastructure/adapters/repository/ProductRepository';
import ProductDTO from '../dto/ProductDTO';
import ProductMapper from '../mappers/ProductMapper';

@Injectable()
export default class ProductService {
  constructor(
    @Inject('IProductRepository') private productRepository: ProductRepository,
  ) {}

  public async getProductById(id) {
    const productResponse = ProductMapper.toDTO(
      await this.productRepository.getById(id),
    );

    return productResponse;
  }

  public async getAllProducts(params?) {
    return ProductMapper.toDTOList(await this.productRepository.getAll(params));
  }

  public async createProduct(productDTO: ProductDTO) {
    const product = await ProductMapper.toDomain(productDTO);
    const productResponse = ProductMapper.toDTO(
      await this.productRepository.create(product),
    );
    return productResponse;
  }

  public async updateProduct(id, productDTO: ProductDTO) {
    const product = await ProductMapper.toDomain(productDTO);

    await this.productRepository.update(id, product);
    return productDTO;
  }
  public deleteProduct(id) {
    return this.productRepository.delete(id);
  }
}
