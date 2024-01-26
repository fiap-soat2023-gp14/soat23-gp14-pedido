import UserUseCase from './UserUseCase';
import ProductUseCase from './ProductUseCase';
import { Money } from '../../domain/valueObjects/Money';
import { PaymentUseCase } from './PaymentUseCase';
import OrderUseCase from './OrderUseCase';
import OrderGateway from '../../../infrastructure/adapters/gateway/OrderGateway';
import { MongoConnection } from '../../../infrastructure/adapters/external/MongoConnection';
import { ProductCategory } from '../../domain/enums/ProductCategory';
import { OrderStatus } from '../../domain/enums/OrderStatus';
import { CPF } from '../../domain/valueObjects/Cpf';
import UserGateway from '../../../infrastructure/adapters/gateway/UserGateway';
import ProductGateway from '../../../infrastructure/adapters/gateway/ProductGateway';
import MercadoPagoPaymentGateway from '../../../infrastructure/adapters/external/MercadoPagoPaymentGateway';

jest.mock('../../../infrastructure/adapters/gateway/OrderGateway');
jest.mock('./UserUseCase');
jest.mock('./ProductUseCase');
jest.mock('./PaymentUseCase');
jest.mock('../../../infrastructure/adapters/external/MongoConnection');

describe('OrderUseCase', () => {
  describe('getOrderById', () => {
    // ... tests for getOrderById (similar to previous examples)
  });

  describe('getAllOrders', () => {
    // ... tests for getAllOrders (similar to previous examples)
  });

  describe('createOrder', () => {
    it('should create an order with all dependencies resolved', async () => {
      const mongoConnection = new MongoConnection();
      const token = 'oauthToken';
      const orderGateway = new OrderGateway(mongoConnection);
      const userGateway = new UserGateway();
      const productGateway = new ProductGateway();
      const paymentGateway = new MercadoPagoPaymentGateway();
      const price = await Money.create(100);
      const cpf = await CPF.create('12345678910');
      // Mock all dependencies
      const order = {
        id: '1',
        customer: {
          id: '42',
          email: 'test@test.com',
          name: 'test untario',
          cpf: cpf,
          phone: '123456789',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        createdAt: new Date(),
        deliveredAt: new Date(),
        extraItems: undefined,
        items: [
          {
            product: {
              id: '3',
              name: 'Test Product',
              description: 'A great product',
              imageUrl: 'https://example.com/product.jpg',
              price: price,
              category: ProductCategory.SANDWICH,
              createdAt: new Date(),
            },
            observation: undefined,
            quantity: 1,
          },
        ],
        status: OrderStatus.RECEIVED,
        total: price,
      };
      (orderGateway.create as jest.Mock).mockResolvedValueOnce(order);
      (UserUseCase.getUserById as jest.Mock).mockResolvedValueOnce({
        id: '42',
        name: 'test untario',
        email: 'test@test.com',
        cpf: '12345678910',
      });
      (ProductUseCase.getProductById as jest.Mock).mockResolvedValueOnce({
        id: '3',
        name: 'Test Product',
        description: 'A great product',
        price: 100,
        category: ProductCategory.SANDWICH,
        imageUrl: 'https://example.com/product.jpg',
        createdAt: new Date(),
      });

      // (Money.create as jest.Mock).mockResolvedValueOnce({});
      (PaymentUseCase.createPayment as jest.Mock).mockResolvedValueOnce({});

      const createdOrder = await OrderUseCase.createOrder(
        order,
        token,
        orderGateway,
        userGateway,
        productGateway,
        paymentGateway,
      );

      expect(orderGateway.create).toBeCalledTimes(1);
      expect(orderGateway.create).toBeCalledWith(order);
    });

    // ... tests for other scenarios, including errors
  });

  describe('updateOrder', () => {
    // ... tests for updateOrder (similar to previous examples)
  });

  describe('getSortedOrders', () => {
    // ... tests for getSortedOrders (similar to previous examples)
  });
});
