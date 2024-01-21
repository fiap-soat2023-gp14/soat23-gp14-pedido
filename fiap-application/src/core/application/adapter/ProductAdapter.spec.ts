import { Money } from 'src/core/domain/valueObjects/Money';
import ProductAdapter from './ProductAdapter';
import { ProductCategory } from 'src/core/domain/enums/ProductCategory';

describe('toDomain function', () => {
  it('should convert a ProductDTO to a Product object', async () => {
    const price = await Money.create(123.45);

    const productDTO = {
      id: '1',
      name: 'Test Product',
      description: 'A great product',
      price: 123.45,
      category: ProductCategory.SANDWICH,
      imageUrl: 'https://example.com/product.jpg',
      createdAt: new Date(),
    };

    const product = await ProductAdapter.toDomain(productDTO);

    expect(product).toStrictEqual({
      id: productDTO.id,
      name: productDTO.name,
      description: productDTO.description,
      price: price,
      category: productDTO.category,
      imageUrl: productDTO.imageUrl,
      createdAt: productDTO.createdAt, // Validate createdAt is a Date instance
    });
  });

  describe('toDTO function', () => {
    it('should convert a Product object to a ProductDTO object', async () => {
      const price = await Money.create(123.45);
      const product = {
        id: '1',
        name: 'Test Product',
        description: 'A great product',
        price: price,
        category: ProductCategory.DESSERT,
        imageUrl: 'https://example.com/product.jpg',
        createdAt: new Date(),
      };

      const productDTO = ProductAdapter.toDTO(product);

      expect(productDTO).toStrictEqual({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price.value,
        category: product.category,
        imageUrl: product.imageUrl,
        createdAt: product.createdAt,
      });
    });
  });
});
