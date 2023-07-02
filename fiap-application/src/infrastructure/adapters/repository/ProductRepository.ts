import { Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from '../../../core/domain/repositories/IProductRepository';
import { v4 } from 'uuid';
import MongoDBAdapter from 'src/infrastructure/MongoDBAdapter';
import { HttpNotFoundException } from '../../exceptions/HttpNotFoundException';

@Injectable()
export default class ProductRepository implements IProductRepository {
  collectionName = 'Products';
  constructor(@Inject('MongoDBAdapter') private mongdbAdater: MongoDBAdapter) { }

  public async getAll(queryParam?): Promise<Product[]> {
    let query = {};
    if (queryParam) query = { ...queryParam };
    const products = await this.mongdbAdater
      .getCollection(this.collectionName)
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();
    const productsResponse = products.map((product) => ({
      ...product,
      id: product._id,
    }));
    return Promise.resolve(productsResponse);
  }
  public async create(product: Product): Promise<Product> {
    const Item = { ...product };

    try {
      await this.mongdbAdater
        .getCollection(this.collectionName)
        .insertOne(Item);
      console.log('Product created successfully.');

      return Promise.resolve({ ...product, id: Item._id });
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }
  public async getById(id: string): Promise<Product> {
    const product = await this.mongdbAdater
      .getCollection(this.collectionName)
      .findOne({ _id: id });
    if (!product)
      throw new HttpNotFoundException(`Product with id ${id} not found`);
    return Promise.resolve(product);
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
    const productValidate = await this.mongdbAdater
      .getCollection('Products')
      .find({ _id: id });
    if (!productValidate) throw new Error(`Product with id ${id} not found`);
    try {
      delete product._id;
      const updateProduct = {
        $set: { ...product },
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
