import OrderGateway from './OrderGateway';
import { IConnection } from '../../adapters/external/IConnection';
import { Order } from '../../../core/domain/entities/Order';
import { OrderEntity } from './entity/OrderEntity';
import { OrderMapper } from './mappers/OrderMapper';
import { OrderMock } from '../../mocks/OrderMock';

jest.mock('../../adapters/external/IConnection');
jest.mock('mongodb');

describe('OrderGateway', () => {
  let orderGateway: OrderGateway;
  let dbConnection: { getCollection: jest.Mock<any, any, any> };
  let connectionMock: IConnection;

  beforeEach(() => {
    // dbConnection = {
    //   getCollection: jest.fn().mockReturnValue({
    //     insertOne: jest.fn(),
    //     find: jest.fn().mockReturnThis(),
    //     sort: jest.fn().mockReturnThis(),
    //     toArray: jest.fn(),
    //     findOne: jest.fn(),
    //     updateOne: jest.fn(),
    //   }),
    // };
    connectionMock = {
      connect: jest.fn(),
      getCollection: jest.fn(),
    } as any;

    orderGateway = new OrderGateway(connectionMock);
  });

  describe('create', () => {
    it('should create an order successfully', async () => {
      // Arrange
      const order: Order = await OrderMock.getOrder();
      const orderEntity: OrderEntity = OrderMock.getOrderEntity();

      const insertOne = jest.fn().mockResolvedValueOnce(orderEntity);
      const collection = jest.fn().mockReturnValueOnce({ insertOne });

      const connectSpy = jest
        .spyOn(connectionMock, 'getCollection')
        .mockReturnValue({ collection });
      // const insertOneSpy = jest.spyOn(
      //   dbConnection.getCollection(),
      //   'insertOne',
      // );

      // Act
      const result = await orderGateway.create(order);
      expect(connectSpy).toHaveBeenCalled();
      // Assert
      expect(insertOne).toHaveBeenCalledWith(orderEntity);
      expect(result).toEqual(order);
    });

    // it('should throw an error if there is an error creating the order', async () => {
    //   // Arrange
    //
    //   const order: Order = await OrderMock.getOrder();
    //   const error = new Error('Error creating order');
    //   jest
    //     .spyOn(dbConnection.getCollection(), 'insertOne')
    //     .mockRejectedValueOnce(error);
    //
    //   // Act & Assert
    //   await expect(orderGateway.create(order)).rejects.toThrow(error);
    // });
  });
  //
  // describe('getAll', () => {
  //   it('should get all orders successfully', async () => {
  //     // Arrange
  //     const orders: OrderEntity[] = [await OrderMock.getOrderEntity()];
  //     jest.spyOn(dbConnection.getCollection(), 'find').mockReturnThis();
  //     jest.spyOn(dbConnection.getCollection(), 'sort').mockReturnThis();
  //     jest
  //       .spyOn(dbConnection.getCollection(), 'toArray')
  //       .mockResolvedValueOnce(orders);
  //
  //     // Act
  //     const result = await orderGateway.getAll();
  //
  //     // Assert
  //     expect(result).toEqual(OrderMapper.toDomainList(orders));
  //   });
  //
  //   it('should get all orders with query parameters successfully', async () => {
  //     // Arrange
  //     const queryParam = { status: 'pending' };
  //     const orders: OrderEntity[] = [OrderMock.getOrderEntity()];
  //     jest.spyOn(dbConnection.getCollection(), 'find').mockReturnThis();
  //     jest.spyOn(dbConnection.getCollection(), 'sort').mockReturnThis();
  //     jest
  //       .spyOn(dbConnection.getCollection(), 'toArray')
  //       .mockResolvedValueOnce(orders);
  //     const toStatusEntitySpy = jest
  //       .spyOn(OrderMapper, 'toStatusEntity')
  //       .mockResolvedValueOnce(1);
  //
  //     // Act
  //     const result = await orderGateway.getAll(queryParam);
  //
  //     // Assert
  //     expect(toStatusEntitySpy).toHaveBeenCalledWith(queryParam.status);
  //     expect(result).toEqual(OrderMapper.toDomainList(orders));
  //   });
  // });
  //
  // describe('getSorted', () => {
  //   it('should get sorted orders successfully', async () => {
  //     // Arrange
  //     const orders: OrderEntity[] = [OrderMock.getOrderEntity()];
  //     jest.spyOn(dbConnection.getCollection(), 'find').mockReturnThis();
  //     jest.spyOn(dbConnection.getCollection(), 'sort').mockReturnThis();
  //     jest
  //       .spyOn(dbConnection.getCollection(), 'toArray')
  //       .mockResolvedValueOnce(orders);
  //
  //     // Act
  //     const result = await orderGateway.getSorted();
  //
  //     // Assert
  //     expect(result).toEqual(OrderMapper.toDomainList(orders));
  //   });
  // });
  //
  // describe('getById', () => {
  //   it('should get an order by id successfully', async () => {
  //     // Arrange
  //     const id = '123';
  //     const orderEntity: OrderEntity = OrderMock.getOrderEntity();
  //     jest
  //       .spyOn(dbConnection.getCollection(), 'findOne')
  //       .mockResolvedValueOnce(orderEntity);
  //
  //     // Act
  //     const result = await orderGateway.getById(id);
  //
  //     // Assert
  //     expect(result).toEqual(OrderMapper.toDomain(orderEntity));
  //   });
  //
  //   it('should return null if the order is not found', async () => {
  //     // Arrange
  //     const id = '123';
  //     jest
  //       .spyOn(dbConnection.getCollection(), 'findOne')
  //       .mockResolvedValueOnce(null);
  //
  //     // Act
  //     const result = await orderGateway.getById(id);
  //
  //     // Assert
  //     expect(result).toBeNull();
  //   });
  // });
  //
  // describe('updateStatus', () => {
  //   it('should update the status of an order successfully', async () => {
  //     // Arrange
  //     const id = '123';
  //     const order: Order = await OrderMock.getOrder();
  //     const orderEntity: OrderEntity = OrderMock.getOrderEntity();
  //     const updateOneSpy = jest.spyOn(
  //       dbConnection.getCollection(),
  //       'updateOne',
  //     );
  //
  //     // Act
  //     const result = await orderGateway.updateStatus(id, order);
  //
  //     // Assert
  //     expect(updateOneSpy).toHaveBeenCalledWith(
  //       { _id: id },
  //       {
  //         $set: {
  //           status: orderEntity.status,
  //           deliveredAt: orderEntity.deliveredAt,
  //         },
  //       },
  //     );
  //     expect(result).toEqual(order);
  //   });
  //
  //   it('should throw an error if there is an error updating the order', async () => {
  //     // Arrange
  //     const id = '123';
  //     const order: Order = await OrderMock.getOrder();
  //     const error = new Error('Error updating order');
  //     jest
  //       .spyOn(dbConnection.getCollection(), 'updateOne')
  //       .mockRejectedValueOnce(error);
  //
  //     // Act & Assert
  //     await expect(orderGateway.updateStatus(id, order)).rejects.toThrow(error);
  //   });
  // });
});
