import { Inject, Injectable } from '@nestjs/common';
import ProductRepository from '../../../infrastructure/adapters/repository/ProductRepository';
import { v4 } from 'uuid';
import ProductDTO from '../dto/ProductDTO';

@Injectable()
export default class ProductService {
  constructor(
    @Inject('IProductRepository') private productRepository: ProductRepository,
  ) {}

  public async getProductById(id) {
    const productResponse = this.copyProduct(
      await this.productRepository.getById(id),
    );

    return productResponse;
  }

  public async getAllProducts(params?) {
    return this.copyProducList(await this.productRepository.getAll(params));
  }

  public async createProduct(productDTO: ProductDTO) {
    const product = this.createNewProduct(productDTO);
    const productResponse = this.copyProduct(
      await this.productRepository.create(product),
    );
    return productResponse;
  }

  public async updateProduct(id, productDTO: ProductDTO) {
    let product = await this.productRepository.getById(id);
    product = this.copyProductDTO(productDTO, product);

    await this.productRepository.update(id, product);
    return productDTO;
  }
  public deleteProduct(id) {
    return this.productRepository.delete(id);
  }

  copyProducList(products: Product[]): ProductDTO[] {
    return products.map((product) => this.copyProduct(product));
  }
  copyProduct(product: Product): ProductDTO {
    return {
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      imageUrl: product.imageUrl,
    };
  }

  createNewProduct(productDTO: ProductDTO): Product {
    return {
      _id: v4(),
      name: productDTO.name,
      description: productDTO.description,
      price: productDTO.price,
      category: productDTO.category,
      imageUrl: productDTO.imageUrl,
      createdAt: new Date(),
    };
  }
  copyProductDTO(productDTO: ProductDTO, product: Product): Product {
    if (productDTO.id) product._id = productDTO.id;
    if (productDTO.name) product.name = productDTO.name;
    if (productDTO.description) product.description = productDTO.description;
    if (productDTO.price) product.price = productDTO.price;
    if (productDTO.category) product.category = productDTO.category;
    if (productDTO.imageUrl) product.imageUrl = productDTO.imageUrl;

    return product;
  }
}
