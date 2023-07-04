import { Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from '../../../core/application/repositories/IProductRepository';
import MongoDBAdapter from '../../MongoDBAdapter';
import { HttpNotFoundException } from '../../exceptions/HttpNotFoundException';
import ProductMapper from './mappers/ProductMapper';
import Product from '../../../core/domain/entities/Product';

@Injectable()
export default class ProductRepository implements IProductRepository {
  collectionName = 'Products';
  constructor(
    @Inject('IMongoDBAdapter') private mongdbAdater: MongoDBAdapter,
  ) {}

  public async getAll(queryParam?): Promise<Product[]> {
    let query = {};
    if (queryParam) query = { ...queryParam };
    const products: ProductEntity[] = await this.mongdbAdater
      .getCollection(this.collectionName)
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return Promise.resolve(ProductMapper.toDomainList(products));
  }
  public async create(product: Product): Promise<Product> {
    const productEntity = ProductMapper.toEntity(product);
    const Item = { ...productEntity };

    try {
      await this.mongdbAdater
        .getCollection(this.collectionName)
        .insertOne(Item);
      console.log('Product created successfully.');

      return Promise.resolve(ProductMapper.toDomain(productEntity));
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }
  public async getById(id: string): Promise<Product> {
    const product: ProductEntity = await this.mongdbAdater
      .getCollection(this.collectionName)
      .findOne({ _id: id });
    if (!product)
      throw new HttpNotFoundException(`Product with id ${id} not found`);
    return Promise.resolve(ProductMapper.toDomain(product));
  }

  public async delete(id: string): Promise<void> {
    const product = await this.mongdbAdater
      .getCollection(this.collectionName)
      .findOne({ _id: id });
    if (!product)
      throw new HttpNotFoundException(`Product with id ${id} not found`);
    await this.mongdbAdater
      .getCollection(this.collectionName)
      .deleteOne({ _id: id });
    return Promise.resolve();
  }

  public async update(id: string, product: Product): Promise<Product> {
    const productValidate: ProductEntity = await this.mongdbAdater
      .getCollection(this.collectionName)
      .find({ _id: id });
    if (!productValidate) throw new Error(`Product with id ${id} not found`);
    try {
      const productEnty = ProductMapper.toEntity(product);
      delete productEnty._id;
      const updateProduct = {
        $set: { ...productEnty },
      };
      await this.mongdbAdater
        .getCollection(this.collectionName)
        .updateOne({ _id: id }, updateProduct);
      console.log('Product updated successfully.');
      return Promise.resolve(product);
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }
}
