import { OrderController } from './OrderController';
import { IConnection } from '../adapters/external/IConnection';
import { OrderStatus } from '../../core/domain/enums/OrderStatus';
import OrderUseCase from 'src/core/application/usecase/OrderUseCase';
import { Money } from 'src/core/domain/valueObjects/Money';
import { ProductCategory } from '../../core/domain/enums/ProductCategory';
import { CPF } from '../../core/domain/valueObjects/Cpf';
import { Order } from '../../core/domain/entities/Order';
import { OrderResponseDTO } from '../../core/application/dto/OrderResponseDTO';
import { OrderMock } from '../mocks/OrderMock';

describe('OrderController', () => {
  let orderController: OrderController;
  let orderConnectionMock: IConnection;

  beforeEach(() => {
    orderConnectionMock = {} as IConnection;
    orderController = new OrderController();
  });

  describe('createOrder', () => {
    it('should create an order and return the order response', async () => {
      // Mock dependencies and input parameters
      const body = OrderMock.getOrderBody();
      const oauthToken = 'mockToken';

      const orderMockResolver = await OrderMock.getOrder();

      const expectedOrderResponse = OrderMock.getOrderDTO();
      jest
        .spyOn(OrderUseCase, 'createOrder')
        .mockResolvedValueOnce(orderMockResolver);

      // Call the method under test
      const result = await orderController.createOrder(
        body,
        oauthToken,
        orderConnectionMock,
      );

      // Assert the result
      expect(result).toEqual(expectedOrderResponse);
    });
  });

  describe('updateOrder', () => {
    it('should update an order and return the order response', async () => {
      // Mock dependencies and input parameters
      const body = {
        status: OrderStatus.FINISHED,
      };

      const price = await Money.create(100);
      const cpf = await CPF.create('12345678910');
      const orderMockResolver = OrderMock.getOrder();
      const expectedOrderResponse = OrderMock.getOrderDTO();
      jest
        .spyOn(OrderUseCase, 'updateOrder')
        .mockResolvedValueOnce(orderMockResolver);

      // Call the method under test
      const result = await orderController.updateOrder(
        'ord-1',
        OrderStatus.RECEIVED,
        orderConnectionMock,
      );

      // Assert the result
      expect(result).toEqual(expectedOrderResponse);
    });
  });
  describe('getAllOrders', () => {
    it('should get all orders and return the order response list', async () => {
      // Mock dependencies and input parameters
      const params = {
        /* mock params */
      };

      // Mock the expected return value
      const price1 = await Money.create(100);
      const total = await Money.create(100);
      const cpf = await CPF.create('12345678910');
      const mockedOrderResponseList: Order[] = [
        {
          id: '1',
          customer: {
            id: '42',
            email: 'test@test.com',
            name: 'test untario',
            cpf: cpf,
            phone: '123456789',
            createdAt: new Date('2024-01-26T17:41:00Z'),
          },
          createdAt: new Date('2024-01-26T17:41:00Z'),
          deliveredAt: new Date('2024-01-26T17:41:00Z'),
          extraItems: undefined,
          items: [
            {
              product: {
                id: '3',
                name: 'test product',
                description: 'only unit test',
                imageUrl: 'http://imagetest.com.png',
                price: price1,
                category: ProductCategory.SANDWICH,
                createdAt: new Date('2024-01-26T17:41:00Z'),
              },
              observation: undefined,
              quantity: 1,
            },
          ],
          status: OrderStatus.RECEIVED,
          total: total,
        },
      ];
      const expectedOrderResponseList: OrderResponseDTO[] = [
        {
          id: '1',
          customer: {
            id: '42',
            email: 'test@test.com',
            name: 'test untario',
            cpf: '12345678910',
            phone: '123456789',
          },
          createdAt: new Date('2024-01-26T17:41:00Z'),
          deliveredAt: new Date('2024-01-26T17:41:00Z'),
          extraItems: undefined,
          items: [
            {
              product: {
                id: '3',
                name: 'test product',
                description: 'only unit test',
                imageUrl: 'http://imagetest.com.png',
                price: 100,
                category: ProductCategory.SANDWICH,
                createdAt: new Date('2024-01-26T17:41:00Z'),
              },
              observation: undefined,
              quantity: 1,
            },
          ],
          status: OrderStatus.RECEIVED,
          total: 100,
        },
      ];
      jest
        .spyOn(OrderUseCase, 'getAllOrders')
        .mockResolvedValueOnce(mockedOrderResponseList);

      // Call the method under test
      const result = await orderController.getAllOrders(
        params,
        orderConnectionMock,
      );

      // Assert the result
      expect(result).toEqual(expectedOrderResponseList);
    });
  });

  describe('getSortedOrders', () => {
    it('should get all orders sorted and return the order response list', async () => {
      // Mock dependencies and input parameters
      const params = {
        status: OrderStatus.RECEIVED,
      };

      // Mock the expected return value
      const price1 = await Money.create(100);
      const total = await Money.create(100);
      const cpf = await CPF.create('12345678910');
      const mockedOrderResponseList: Order[] = [
        {
          id: '1',
          customer: {
            id: '42',
            email: 'test@test.com',
            name: 'test untario',
            cpf: cpf,
            phone: '123456789',
            createdAt: new Date('2024-01-26T17:41:00Z'),
          },
          createdAt: new Date('2024-01-26T17:41:00Z'),
          deliveredAt: new Date('2024-01-26T17:41:00Z'),
          extraItems: undefined,
          items: [
            {
              product: {
                id: '3',
                name: 'test product',
                description: 'only unit test',
                imageUrl: 'http://imagetest.com.png',
                price: price1,
                category: ProductCategory.SANDWICH,
                createdAt: new Date('2024-01-26T17:41:00Z'),
              },
              observation: undefined,
              quantity: 1,
            },
          ],
          status: OrderStatus.RECEIVED,
          total: total,
        },
      ];
      const expectedOrderResponseList: OrderResponseDTO[] = [
        {
          id: '1',
          customer: {
            id: '42',
            email: 'test@test.com',
            name: 'test untario',
            cpf: '12345678910',
            phone: '123456789',
          },
          createdAt: new Date('2024-01-26T17:41:00Z'),
          deliveredAt: new Date('2024-01-26T17:41:00Z'),
          extraItems: undefined,
          items: [
            {
              product: {
                id: '3',
                name: 'test product',
                description: 'only unit test',
                imageUrl: 'http://imagetest.com.png',
                price: 100,
                category: ProductCategory.SANDWICH,
                createdAt: new Date('2024-01-26T17:41:00Z'),
              },
              observation: undefined,
              quantity: 1,
            },
          ],
          status: OrderStatus.RECEIVED,
          total: 100,
        },
      ];
      jest
        .spyOn(OrderUseCase, 'getSortedOrders')
        .mockResolvedValueOnce(mockedOrderResponseList);

      // Call the method under test
      const result = await orderController.getSortedOrders(
        params,
        orderConnectionMock,
      );

      // Assert the result
      expect(result).toEqual(expectedOrderResponseList);
    });
  });

  describe('getOrderById', () => {
    it('should get order by id and return the order response', async () => {
      // Mock dependencies and input parameters
      const params = {
        status: OrderStatus.RECEIVED,
      };

      // Mock the expected return value
      const price1 = await Money.create(100);
      const total = await Money.create(100);
      const cpf = await CPF.create('12345678910');
      const mockedOrderResponseList: Order = {
        id: 'ord-1',
        customer: {
          id: '42',
          email: 'test@test.com',
          name: 'test untario',
          cpf: cpf,
          phone: '123456789',
          createdAt: new Date('2024-01-26T17:41:00Z'),
        },
        createdAt: new Date('2024-01-26T17:41:00Z'),
        deliveredAt: new Date('2024-01-26T17:41:00Z'),
        extraItems: undefined,
        items: [
          {
            product: {
              id: '3',
              name: 'test product',
              description: 'only unit test',
              imageUrl: 'http://imagetest.com.png',
              price: price1,
              category: ProductCategory.SANDWICH,
              createdAt: new Date('2024-01-26T17:41:00Z'),
            },
            observation: undefined,
            quantity: 1,
          },
        ],
        status: OrderStatus.RECEIVED,
        total: total,
      };
      const expectedOrderResponseList: OrderResponseDTO = {
        id: 'ord-1',
        customer: {
          id: '42',
          email: 'test@test.com',
          name: 'test untario',
          cpf: '12345678910',
          phone: '123456789',
        },
        createdAt: new Date('2024-01-26T17:41:00Z'),
        deliveredAt: new Date('2024-01-26T17:41:00Z'),
        extraItems: undefined,
        items: [
          {
            product: {
              id: '3',
              name: 'test product',
              description: 'only unit test',
              imageUrl: 'http://imagetest.com.png',
              price: 100,
              category: ProductCategory.SANDWICH,
              createdAt: new Date('2024-01-26T17:41:00Z'),
            },
            observation: undefined,
            quantity: 1,
          },
        ],
        status: OrderStatus.RECEIVED,
        total: 100,
      };
      jest
        .spyOn(OrderUseCase, 'getOrderById')
        .mockResolvedValueOnce(mockedOrderResponseList);

      // Call the method under test
      const result = await orderController.getOrderById(
        'ord-1',
        orderConnectionMock,
      );

      // Assert the result
      expect(result).toEqual(expectedOrderResponseList);
    });
  });
  // Add tests for other methods (getSortedOrders, getOrderById, updateOrder) in a similar manner
});
