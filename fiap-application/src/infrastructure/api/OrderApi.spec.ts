import OrderApi from './OrderApi';
import { IConnection } from '../adapters/external/IConnection';
import { OrderStatus } from '../../core/domain/enums/OrderStatus';
import { OrderResponseDTO } from '../../core/application/dto/OrderResponseDTO';
import { HttpStatus } from '@nestjs/common';
import { ProductCategory } from '../../core/domain/enums/ProductCategory';
import { OrderController } from '../controller/OrderController';
import { Test, TestingModule } from '@nestjs/testing';
import { OrderCreationDTO } from '../../core/application/dto/OrderCreationDTO';
import {QueuesModule} from "../adapters/external/queues.module";

jest.mock('../controller/OrderController');

describe('OrderApi', () => {
  let orderApi: OrderApi;
  let orderControllerMock: OrderController;
  let connectionMock: IConnection;
  let mockResponse: any;

  beforeEach(async () => {
    orderControllerMock = {
      createOrder: jest.fn(),
      getAllOrders: jest.fn(),
      getOrderById: jest.fn(),
      updateOrder: jest.fn(),
    } as any;
    connectionMock = {
      connection: jest.fn(),
      getCollection: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      imports: [QueuesModule],
      controllers: [OrderApi],
      providers: [
        { provide: OrderController, useValue: orderControllerMock },
        { provide: IConnection, useValue: connectionMock },
      ],
    }).compile();

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    orderApi = module.get<OrderApi>(OrderApi);
  });

  it('should be defined', () => {
    expect(orderApi).toBeDefined();
  });

  describe('getAllOrders', () => {
    it('should get all orders and return the order response list', async () => {
      const status = OrderStatus.RECEIVED;
      const expectedOrders: OrderResponseDTO[] = [
        {
          id: 'order123',
          status: OrderStatus.RECEIVED,
          customer: {
            id: 'user456',
            name: 'John Doe',
            email: 'johndoe@example.com',
            cpf: '12345678900',
            phone: '11999999999',
          },
          items: [
            {
              product: {
                id: 'prod789',
                name: 'Product 1',
                description: 'Product 1 description',
                imageUrl: 'https://example.com/product1.jpg',
                price: 19.99,
                category: ProductCategory.DESSERT,
                createdAt: new Date('2022-01-01T00:00:00Z'),
              },
              quantity: 3,
              observation: 'First product observation',
            },
            {
              product: {
                id: 'prod012',
                name: 'Product 2',
                description: 'Product 2 description',
                imageUrl: 'https://example.com/product2.jpg',
                price: 29.99,
                category: ProductCategory.DRINK,
                createdAt: new Date('2022-01-01T00:00:00Z'),
              },
              quantity: 1,
              observation: 'Second product observation',
            },
          ],
          extraItems: 'Extra item details',
          createdAt: new Date('2022-01-01T00:00:00Z'),
          deliveredAt: new Date('2022-01-02T00:00:00Z'),
          total: 99.96,
        },
      ];
      orderControllerMock.getAllOrders = jest
        .fn()
        .mockResolvedValueOnce(expectedOrders);

      // Call the method under test
      await orderApi.getAllOrders(mockResponse, status);

      // Assert the result
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
      // expect(mockResponse.json).toHaveBeenCalledWith(expectedOrders);
    });
  });

  describe('getSorted', () => {
    it('should get sorted orders and return the order response list', async () => {
      const expectedOrders: OrderResponseDTO[] = [
        {
          id: 'order123',
          status: OrderStatus.RECEIVED,
          customer: {
            id: 'user456',
            name: 'John Doe',
            email: 'johndoe@example.com',
            cpf: '12345678900',
            phone: '11999999999',
          },
          items: [
            {
              product: {
                id: 'prod789',
                name: 'Product 1',
                description: 'Product 1 description',
                imageUrl: 'https://example.com/product1.jpg',
                price: 19.99,
                category: ProductCategory.DESSERT,
                createdAt: new Date('2022-01-01T00:00:00Z'),
              },
              quantity: 3,
              observation: 'First product observation',
            },
            {
              product: {
                id: 'prod012',
                name: 'Product 2',
                description: 'Product 2 description',
                imageUrl: 'https://example.com/product2.jpg',
                price: 29.99,
                category: ProductCategory.DRINK,
                createdAt: new Date('2022-01-01T00:00:00Z'),
              },
              quantity: 1,
              observation: 'Second product observation',
            },
          ],
          extraItems: 'Extra item details',
          createdAt: new Date('2022-01-01T00:00:00Z'),
          deliveredAt: new Date('2022-01-02T00:00:00Z'),
          total: 99.96,
        },
      ];
      orderControllerMock.getAllOrders = jest
        .fn()
        .mockResolvedValueOnce(expectedOrders);

      // Call the method under test
      await orderApi.getSorted(mockResponse);

      // Assert the result
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
      // expect(mockResponse.json).toHaveBeenCalledWith(expectedOrders);
    });
  });

  describe('getOrders', () => {
    it('should get an order by ID and return the order response', async () => {
      const id = 'order123';
      const expectedOrder: OrderResponseDTO = {
        id: 'order123',
        status: OrderStatus.RECEIVED,
        customer: {
          id: 'user456',
          name: 'John Doe',
          email: 'johndoe@example.com',
          cpf: '12345678900',
          phone: '11999999999',
        },
        items: [
          {
            product: {
              id: 'prod789',
              name: 'Product 1',
              description: 'Product 1 description',
              imageUrl: 'https://example.com/product1.jpg',
              price: 19.99,
              category: ProductCategory.DESSERT,
              createdAt: new Date('2022-01-01T00:00:00Z'),
            },
            quantity: 3,
            observation: 'First product observation',
          },
          {
            product: {
              id: 'prod012',
              name: 'Product 2',
              description: 'Product 2 description',
              imageUrl: 'https://example.com/product2.jpg',
              price: 29.99,
              category: ProductCategory.DRINK,
              createdAt: new Date('2022-01-01T00:00:00Z'),
            },
            quantity: 1,
            observation: 'Second product observation',
          },
        ],
        extraItems: 'Extra item details',
        createdAt: new Date('2022-01-01T00:00:00Z'),
        deliveredAt: new Date('2022-01-02T00:00:00Z'),
        total: 99.96,
      };
      orderControllerMock.getOrderById = jest
        .fn()
        .mockResolvedValueOnce(expectedOrder);

      // Call the method under test
      await orderApi.getOrders(mockResponse, id);

      // Assert the result
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
      // expect(mockResponse.json).toHaveBeenCalledWith(expectedOrder);
    });
  });

  describe('createOrder', () => {
    it('should create an order and return the order response', async () => {
      // Mock dependencies and input parameters
      const reqMock = {
        headers: {
          authorization: 'mockToken',
        },
      };
      const body: OrderCreationDTO = {
        customerId: 'user456',
        items: [
          {
            productId: 'prod789',
            quantity: 3,
            observation: 'First product observation',
          },
          {
            productId: 'prod012',
            quantity: 1,
            observation: 'Second product observation',
          },
        ],
        extraItems: 'Extra item details',
      };
      const expectedOrder: OrderResponseDTO = {
        id: 'order123',
        status: OrderStatus.RECEIVED,
        customer: {
          id: 'user456',
          name: 'John Doe',
          email: 'johndoe@example.com',
          cpf: '12345678900',
          phone: '11999999999',
        },
        items: [
          {
            product: {
              id: 'prod789',
              name: 'Product 1',
              description: 'Product 1 description',
              imageUrl: 'https://example.com/product1.jpg',
              price: 19.99,
              category: ProductCategory.DESSERT,
              createdAt: new Date('2022-01-01T00:00:00Z'),
            },
            quantity: 3,
            observation: 'First product observation',
          },
          {
            product: {
              id: 'prod012',
              name: 'Product 2',
              description: 'Product 2 description',
              imageUrl: 'https://example.com/product2.jpg',
              price: 29.99,
              category: ProductCategory.DRINK,
              createdAt: new Date('2022-01-01T00:00:00Z'),
            },
            quantity: 1,
            observation: 'Second product observation',
          },
        ],
        extraItems: 'Extra item details',
        createdAt: new Date('2022-01-01T00:00:00Z'),
        deliveredAt: new Date('2022-01-02T00:00:00Z'),
        total: 99.96,
      };

      orderControllerMock.createOrder = jest
        .fn()
        .mockResolvedValue(expectedOrder);
      // Call the method under test
      await orderApi.createOrder(mockResponse, reqMock, body);

      // Assert the result
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
      // expect(mockResponse.json).toHaveBeenCalledWith(expectedOrder);
    });
  });

  describe('updateOrder', () => {
    it('should update an order and return the updated order response', async () => {
      const id = 'order123';
      const body = {
        id: 'order123',
        status: OrderStatus.RECEIVED,
      };
      const expectedOrder: OrderResponseDTO = {
        id: 'order123',
        status: OrderStatus.RECEIVED,
        customer: {
          id: 'user456',
          name: 'John Doe',
          email: 'johndoe@example.com',
          cpf: '12345678900',
          phone: '11999999999',
        },
        items: [
          {
            product: {
              id: 'prod789',
              name: 'Product 1',
              description: 'Product 1 description',
              imageUrl: 'https://example.com/product1.jpg',
              price: 19.99,
              category: ProductCategory.DESSERT,
              createdAt: new Date('2022-01-01T00:00:00Z'),
            },
            quantity: 3,
            observation: 'First product observation',
          },
          {
            product: {
              id: 'prod012',
              name: 'Product 2',
              description: 'Product 2 description',
              imageUrl: 'https://example.com/product2.jpg',
              price: 29.99,
              category: ProductCategory.DRINK,
              createdAt: new Date('2022-01-01T00:00:00Z'),
            },
            quantity: 1,
            observation: 'Second product observation',
          },
        ],
        extraItems: 'Extra item details',
        createdAt: new Date('2022-01-01T00:00:00Z'),
        deliveredAt: new Date('2022-01-02T00:00:00Z'),
        total: 99.96,
      };

      orderControllerMock.updateOrder = jest
        .fn()
        .mockResolvedValue(expectedOrder);

      // Call the method under test
      await orderApi.updateOrder(mockResponse, id, body);

      // Assert the result
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
      // expect(mockResponse.json).toHaveBeenCalledWith(expectedOrder);
    });
  });
});
