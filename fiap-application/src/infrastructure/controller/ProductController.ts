import ProductDTO from '../../core/application/dto/ProductDTO';
import ProductAdapter from '../../core/application/adapter/ProductAdapter';
import { IConnection } from '../../core/application/repositories/IConnection';
import ProductUseCase from '../../core/application/usecase/ProductUseCase';
import ProductGateway from '../adapters/gateway/ProductGateway';

export class ProductController {
  static async getAllProducts(
    params: any,
    dbconnection: IConnection,
  ): Promise<ProductDTO[]> {
    const productGateway = new ProductGateway(dbconnection);
    const allProducts = await ProductUseCase.getAllProducts(
      params,
      productGateway,
    );

    const adapted = ProductAdapter.toDTOList(allProducts);
    return adapted;
  }

  static async getProductById(
    id: string,
    dbconnection: IConnection,
  ): Promise<ProductDTO> {
    const productGateway = new ProductGateway(dbconnection);
    const product = await ProductUseCase.getProductById(id, productGateway);

    const adapted = ProductAdapter.toDTO(product);
    return adapted;
  }

  static async createProduct(
    body: ProductDTO,
    dbconnection: IConnection,
  ): Promise<ProductDTO> {
    const productGateway = new ProductGateway(dbconnection);
    const productBody = await ProductAdapter.toDomain(body);
    const product = await ProductUseCase.createProduct(
      productBody,
      productGateway,
    );

    const adapted = ProductAdapter.toDTO(product);
    return adapted;
  }

  static async updateProduct(
    id: string,
    body: ProductDTO,
    dbconnection: IConnection,
  ): Promise<ProductDTO> {
    const productGateway = new ProductGateway(dbconnection);
    const productBody = await ProductAdapter.toDomain(body);
    const product = await ProductUseCase.updateProduct(
      id,
      productBody,
      productGateway,
    );

    const adapted = ProductAdapter.toDTO(product);
    return adapted;
  }

  static async deleteProduct(id: string, dbconnection: IConnection) {
    const productGateway = new ProductGateway(dbconnection);
    return await ProductUseCase.deleteProduct(id, productGateway);
  }
}
