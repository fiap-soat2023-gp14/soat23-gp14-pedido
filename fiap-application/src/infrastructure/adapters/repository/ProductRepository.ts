import { Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from '../../../core/domain/repositories/IProductRepository';
import { v4 } from 'uuid';
import MongoDBAdapter from '../../MongoDBAdapter';
import { HttpNotFoundException } from '../../exceptions/HttpNotFoundException';

@Injectable()
export default class ProductRepository implements IProductRepository {
  constructor(@Inject('MongoDBAdapter') private mongdbAdater: MongoDBAdapter) {}

  public async getAll(): Promise<Product[]> {
    const products = await this.mongdbAdater
      .getCollection('Products')
      .find()
      .toArray();
    const productsResponse = products.map((product) => ({
      ...product,
      id: product._id,
    }));
    return Promise.resolve(productsResponse);
  }
  public async create(product: Product): Promise<Product> {
    const Item = { ...product, _id: v4() };

    try {
      await this.mongdbAdater.getCollection('Products').insertOne(Item);
      console.log('Product created successfully.');

      return Promise.resolve({ ...product, id: Item._id });
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }
  public async getById(id: string): Promise<Product> {
    const product = await this.mongdbAdater
      .getCollection('Products')
      .findOne({ _id: id });
    if (!product)
      throw new HttpNotFoundException(`Product with id ${id} not found`);
    const productResponse = { ...product, id: product._id };
    return Promise.resolve(productResponse);
  }

  public async delete(id: string): Promise<void> {
    const product = await this.mongdbAdater
      .getCollection('Products')
      .findOne({ _id: id });
    if (!product)
      throw new HttpNotFoundException(`Product with id ${id} not found`);
    await this.mongdbAdater.getCollection('Products').deleteOne({ _id: id });
    return Promise.resolve();
  }

  public async update(id: string, product: Product): Promise<Product> {
    try {
      delete product.id;
      const updateProduct = {
        $set: { ...product },
      };
      await this.mongdbAdater
        .getCollection('Products')
        .updateOne({ _id: id }, updateProduct);
      console.log('Product updated successfully.');
      return Promise.resolve(product);
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }
}
