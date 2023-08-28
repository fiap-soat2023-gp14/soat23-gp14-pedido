import { IConnection } from '../external/IConnection';
import { IProductGateway } from '../../../core/application/repositories/IProductGateway';
import Product from '../../../core/domain/entities/Product';
import { HttpNotFoundException } from '../../exceptions/HttpNotFoundException';
import { ProductEntity } from './entity/ProductEntity';
import ProductMapper from './mappers/ProductMapper';

export default class ProductGateway implements IProductGateway {
  COLLECTION_NAME = 'Products';
  private dbConnection: IConnection;
  constructor(dataBase: IConnection) {
    this.dbConnection = dataBase;
  }

  public async getAll(queryParam?): Promise<Product[]> {
    let query = {};
    if (queryParam) query = { ...queryParam };
    const products: ProductEntity[] = await this.dbConnection
      .getCollection(this.COLLECTION_NAME)
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return Promise.resolve(ProductMapper.toDomainList(products));
  }

  public async create(product: Product): Promise<Product> {
    const productEntity = ProductMapper.toEntity(product);
    const Item = { ...productEntity };

    try {
      await this.dbConnection
        .getCollection(this.COLLECTION_NAME)
        .insertOne(Item);
      console.log('Product created successfully.');

      return Promise.resolve(ProductMapper.toDomain(productEntity));
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  public async getById(id: string): Promise<Product> {
    const product: ProductEntity = await this.dbConnection
      .getCollection(this.COLLECTION_NAME)
      .findOne({ _id: id });
    if (!product) return Promise.resolve(null);
    return Promise.resolve(ProductMapper.toDomain(product));
  }

  public async delete(id: string): Promise<void> {
    await this.dbConnection
      .getCollection(this.COLLECTION_NAME)
      .deleteOne({ _id: id });
    return Promise.resolve();
  }

  public async update(id: string, product: Product): Promise<Product> {
    try {
      const productEnty = ProductMapper.toEntity(product);
      delete productEnty._id;
      const updateProduct = {
        $set: { ...productEnty },
      };
      await this.dbConnection
        .getCollection(this.COLLECTION_NAME)
        .updateOne({ _id: id }, updateProduct);
      console.log('Product updated successfully.');
      return Promise.resolve(product);
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }
}
