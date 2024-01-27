import { ProductCategory } from '../../core/domain/enums/ProductCategory';
import { Money } from '../../core/domain/valueObjects/Money';
import Product from '../../core/domain/entities/Product';
import { ProductEntity } from '../adapters/gateway/entity/ProductEntity';

export class ProductMock {
  public static async getProduct(): Promise<Product> {
    const productMock: Product = {
      id: '3',
      name: 'test product',
      description: 'only unit test',
      imageUrl: 'http://imagetest.com.png',
      price: await Money.create(100),
      category: ProductCategory.SANDWICH,
      createdAt: new Date('2024-01-26T17:41:00Z'),
    };
    return productMock;
  }

  public static getProductEntity(): ProductEntity {
    return {
      _id: '3',
      name: 'test product',
      description: 'only unit test',
      imageUrl: 'http://imagetest.com.png',
      price: 100,
      category: ProductCategory.SANDWICH,
      createdAt: new Date('2024-01-26T17:41:00Z'),
    };
  }

  public static getProductEntityList(): ProductEntity[] {
    return [
      {
        _id: '123',
        name: 'Product 1',
        description: 'This is product 1',
        price: 9.99,
        category: ProductCategory.SANDWICH,
        imageUrl: 'https://example.com/product1.jpg',
        createdAt: new Date(),
      },
      {
        _id: '456',
        name: 'Product 2',
        description: 'This is product 2',
        price: 19.99,
        category: ProductCategory.GARNISH,
        imageUrl: 'https://example.com/product2.jpg',
        createdAt: new Date(),
      },
    ];
  }

  public static async getProductList(): Promise<Product[]> {
    const productMock: Product[] = [
      {
        id: '123',
        name: 'Product 1',
        description: 'This is product 1',
        price: await Money.create(9.99),
        category: ProductCategory.SANDWICH,
        imageUrl: 'https://example.com/product1.jpg',
        createdAt: new Date(),
      },
      {
        id: '456',
        name: 'Product 2',
        description: 'This is product 2',
        price: await Money.create(19.99),
        category: ProductCategory.GARNISH,
        imageUrl: 'https://example.com/product2.jpg',
        createdAt: new Date(),
      },
    ];
    return productMock;
  }
}
