import UserUseCase from './UserUseCase';
import ProductUseCase from './ProductUseCase';
import { PaymentUseCase } from './PaymentUseCase';
import OrderUseCase from './OrderUseCase';
import OrderGateway from '../../../infrastructure/adapters/gateway/OrderGateway';
import { MongoConnection } from '../../../infrastructure/adapters/external/MongoConnection';
import { OrderStatus } from '../../domain/enums/OrderStatus';
import UserGateway from '../../../infrastructure/adapters/gateway/UserGateway';
import ProductGateway from '../../../infrastructure/adapters/gateway/ProductGateway';
import { OrderMock } from '../../../infrastructure/mocks/OrderMock';
import { UserMock } from '../../../infrastructure/mocks/UserMock';
import { ProductMock } from '../../../infrastructure/mocks/ProductMock';
import { HttpNotFoundException } from '../../../infrastructure/exceptions/HttpNotFoundException';

jest.mock('../../../infrastructure/adapters/gateway/OrderGateway');
jest.mock('./UserUseCase');
jest.mock('./ProductUseCase');
jest.mock('./PaymentUseCase');
jest.mock('../../../infrastructure/adapters/external/MongoConnection');
jest.mock('.../../../infrastructure/adapters/gateway/PaymentGateway');

describe('OrderUseCase', () => {
  const mongoConnection = new MongoConnection();
  const token = 'oauthToken';
  const orderGateway = new OrderGateway(mongoConnection);
  const userGateway = new UserGateway();
  const productGateway = new ProductGateway();

  describe('createOrder', () => {
    it('should create an order with all dependencies resolved', async () => {
      const order = await OrderMock.getOrder();
      (orderGateway.create as jest.Mock).mockResolvedValueOnce(order);
      (UserUseCase.getUserById as jest.Mock).mockResolvedValueOnce(
        UserMock.getUserEntity(),
      );

      (ProductUseCase.getProductById as jest.Mock).mockResolvedValueOnce(
        ProductMock.getProductEntity(),
      );

      // (Money.create as jest.Mock).mockResolvedValueOnce({});
      (PaymentUseCase.processPayment as jest.Mock).mockResolvedValueOnce({});

      const createdOrder = await OrderUseCase.createOrder(
        order,
        token,
        orderGateway,
        userGateway,
        productGateway,
      );

      expect(orderGateway.create).toBeCalledTimes(1);
      expect(orderGateway.create).toBeCalledWith(order);
    });

    // ... tests for other scenarios, including errors
  });

  describe('getAllOrders', () => {
    it('should return all orders from the gateway', async () => {
      // Arrange
      const params = {}; // Set your desired params here\
      const orders = await OrderMock.getOrderList();
      (orderGateway.getAll as jest.Mock).mockResolvedValueOnce(orders);

      // Act
      const result = await OrderUseCase.getAllOrders(params, orderGateway);

      // Assert
      expect(orderGateway.getAll).toHaveBeenCalledTimes(1);
      expect(orderGateway.getAll).toHaveBeenCalledWith(params);
      expect(result).toEqual(orders);
    });

    // ... Add more test cases for different scenarios
  });

  describe('getOrderById', () => {
    it('should return the order when it exists', async () => {
      // Arrange
      const id = '123';
      const order = await OrderMock.getOrder();

      (orderGateway.getById as jest.Mock).mockResolvedValueOnce(order);

      // Act
      const result = await OrderUseCase.getOrderById(id, orderGateway);

      // Assert
      expect(orderGateway.getById).toHaveBeenCalledTimes(1);
      expect(orderGateway.getById).toHaveBeenCalledWith(id);
      expect(result).toEqual(order);
    });

    it('should throw an exception when the order does not exist', async () => {
      // Arrange
      const id = '123';
      (orderGateway.getById as jest.Mock).mockResolvedValueOnce(null);

      // Act & Assert
      await expect(OrderUseCase.getOrderById(id, orderGateway)).rejects.toThrow(
        HttpNotFoundException,
      );
      expect(orderGateway.getById).toHaveBeenCalledTimes(1);
      expect(orderGateway.getById).toHaveBeenCalledWith(id);
    });
  });
  describe('updateOrder', () => {
    it('should update the order status and return the updated order', async () => {
      // Arrange
      const id = '123';
      const status = OrderStatus.PAID;
      const order = await OrderMock.getOrder();
      const updatedOrder = {
        ...order,
        status,
        deliveredAt: new Date('2024-01-27T17:41:00Z'),
      };

      (orderGateway.updateStatus as jest.Mock).mockResolvedValueOnce(
        updatedOrder,
      );
      jest
        .spyOn(OrderUseCase, 'getOrderById')
        .mockReturnValueOnce(OrderMock.getOrder());

      // Act
      const result = await OrderUseCase.updateOrder(id, status, orderGateway);

      // Assert
      expect(OrderUseCase.getOrderById).toHaveBeenCalledTimes(1);
      expect(OrderUseCase.getOrderById).toHaveBeenCalledWith(id, orderGateway);
      expect(orderGateway.updateStatus).toHaveBeenCalledTimes(1);
      expect(result).toEqual(updatedOrder);
    });
  });

  describe('getSortedOrders', () => {
    it('should return sorted orders from the gateway', async () => {
      // Arrange
      const params = {}; // Set your desired params here
      const sortedOrders = [OrderMock.getOrder(), OrderMock.getOrder()];
      (orderGateway.getSorted as jest.Mock).mockResolvedValueOnce(sortedOrders);

      // Act
      const result = await OrderUseCase.getSortedOrders(params, orderGateway);

      // Assert
      expect(orderGateway.getSorted).toHaveBeenCalledTimes(1);
      expect(orderGateway.getSorted).toHaveBeenCalledWith(params);
      expect(result).toEqual(sortedOrders);
    });
  });
});
