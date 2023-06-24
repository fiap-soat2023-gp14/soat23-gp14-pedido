import { Inject, Injectable } from "@nestjs/common";
import { IProductRepository } from "../../../core/domain/repositories/iProductRepository";
import { uuid } from "uuidv4";
import MongoDBAdapter from "../../MongoDBAdapter";

@Injectable()
export default class ProductRepository implements IProductRepository {
  constructor(
    @Inject('MongoDBAdapter') private mongdbAdater: MongoDBAdapter,
  ) {}
  private readonly products: Product[] = [
    {
      id: '1',
      name: 'Product 1',
      description: 'descrição produto 1',
      price: 2.4,
      // createAt: new Date(),
      imageUrl: 'url-image',
    },
    {
      id: '2',
      name: 'Product 2',
      description: 'descrição produto 2',
      price: 10.0,
      // createAt: new Date(),
      imageUrl: 'url-image',
    },
  ];

  public async getAll(): Promise<Product[]> {
    return this.products;
  }

  public async create(product: Product): Promise<Product> {
    const Item = { ...product, id: uuid() };

    try {
      await this.mongdbAdater.getCollection('Products').insertOne(Item);
      console.log('Product created successfully.');
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
    return product;
  }

  public async getById(id: string): Promise<Product> {
    const product = this.products.find((product) => product.id === id);
    if (!product) throw new Error(`Product with id ${id} not found`);
    return Promise.resolve(product);
  }

  public async delete(id: string): Promise<void> {
    const product = this.products.find((product) => product.id === id);
    if (!product) throw new Error(`Product with id ${id} not found`);
    this.products.splice(this.products.indexOf(product), 1);
    return Promise.resolve();
  }

  public async update(id: string, product: Product): Promise<Product> {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );
    if (productIndex === -1) throw new Error(`Product with id ${id} not found`);
    this.products[productIndex] = product;
    return Promise.resolve(product);
  }
}
