import OrderAdapter from 'src/core/application/adapter/OrderAdapter';
import { OrderCreationDTO } from 'src/core/application/dto/OrderCreationDTO';
import { OrderResponseDTO } from 'src/core/application/dto/OrderResponseDTO';
import { IConnection } from 'src/core/application/repositories/IConnection';
import OrderUseCase from 'src/core/application/usecase/OrderUseCase';
import OrderGateway from '../adapters/gateway/OrderGateway';

export class OrderController {
  static async createOrder(
    body: OrderCreationDTO,
    dbConnection: IConnection,
  ): Promise<OrderResponseDTO> {
    const gateway = new OrderGateway(dbConnection);
    const orderBody = await OrderAdapter.toDomain(body);
    const order = await OrderUseCase.createOrder(orderBody, gateway);

    const response = OrderAdapter.toDTO(order);
    return response;
  }

  static async getAllOrders(
    params: any,
    dbConnection: IConnection,
  ): Promise<Array<OrderResponseDTO>> {
    const gateway = new OrderGateway(dbConnection);
    const orders = await OrderUseCase.getAllOrders(params, gateway);

    const response = OrderAdapter.toDTOList(orders);
    return response;
  }

  static async getSortedOrders(
    params: any,
    dbConnection: IConnection,
  ): Promise<Array<OrderResponseDTO>> {
    const gateway = new OrderGateway(dbConnection);
    const orders = await OrderUseCase.getSortedOrders(params, gateway);

    const response = OrderAdapter.toDTOList(orders);
    return response;
  }

  static async getOrderById(
    id: string,
    dbConnection: IConnection,
  ): Promise<OrderResponseDTO> {
    const gateway = new OrderGateway(dbConnection);
    const order = await OrderUseCase.getOrderById(id, gateway);

    const response = OrderAdapter.toDTO(order);
    return response;
  }

  static async updateOrder(
    id: string,
    body: OrderCreationDTO,
    dbConnection: IConnection,
  ): Promise<OrderResponseDTO> {
    const gateway = new OrderGateway(dbConnection);
    const orderBody = await OrderAdapter.toDomain(body);
    const order = await OrderUseCase.updateOrder(id, orderBody, gateway);

    const response = OrderAdapter.toDTO(order);
    return response;
  }
}
