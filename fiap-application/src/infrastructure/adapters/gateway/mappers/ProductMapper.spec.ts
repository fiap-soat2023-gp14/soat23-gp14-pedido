import { ProductEntity } from '../entity/ProductEntity';
import { ProductMock } from '../../../mocks/ProductMock';
import Product from '../../../../core/domain/entities/Product';
import ProductMapper from './ProductMapper';

describe('ProductMapper', () => {
  describe('toDomain', () => {
    it('should convert a ProductEntity to a Product domain object', async () => {
      const productEntity: ProductEntity = ProductMock.getProductEntity();

      const expectedProduct: Product = await ProductMock.getProduct();

      const result = await ProductMapper.toDomain(productEntity);

      expect(result).toEqual(expectedProduct);
    });
  });

  describe('toDomainList', () => {
    it('should convert a list of ProductEntity to a list of Product domain objects', async () => {
      const productEntities: ProductEntity[] =
        ProductMock.getProductEntityList();
      const expectedProducts: Product[] = await ProductMock.getProductList();
      const result = await ProductMapper.toDomainList(productEntities);

      expect(result).toEqual(expectedProducts);
    });
  });

  describe('toEntity', () => {
    it('should convert a Product domain object to a ProductEntity', async () => {
      const product: Product = await ProductMock.getProduct();

      const expectedProductEntity: ProductEntity =
        ProductMock.getProductEntity();

      const result = ProductMapper.toEntity(product);

      expect(result).toEqual(expectedProductEntity);
    });
  });
});
