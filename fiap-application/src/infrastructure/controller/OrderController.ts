import OrderAdapter from 'src/core/application/adapter/OrderAdapter';
import { OrderCreationDTO } from 'src/core/application/dto/OrderCreationDTO';
import { OrderResponseDTO } from 'src/core/application/dto/OrderResponseDTO';
import { IConnection } from 'src/infrastructure/adapters/external/IConnection';
import OrderUseCase from 'src/core/application/usecase/OrderUseCase';
import OrderGateway from '../adapters/gateway/OrderGateway';
import {OrderStatusUpdateDTO} from "../../core/application/dto/OrderStatusUpdateDTO";
import { OrderStatus } from '../../core/domain/enums/OrderStatus';
import {PaymentController} from "./PaymentController";
import UserGateway from '../adapters/gateway/UserGateway';
import ProductGateway from '../adapters/gateway/ProductGateway';
import { IOrderGateway } from '../../core/application/repositories/IOrderGateway';
import { IUserGateway } from '../../core/application/repositories/IUserGateway';
import { IProductGateway } from '../../core/application/repositories/IProductGateway';

export class OrderController {
  static async createOrder(
    body: OrderCreationDTO,
    dbConnection: IConnection,
  ): Promise<OrderResponseDTO> {
    const orderGateway: IOrderGateway = new OrderGateway(dbConnection);
    const userGateway: IUserGateway = new UserGateway(dbConnection);
    const productGateway: IProductGateway = new ProductGateway(dbConnection);
    const orderBody = await OrderAdapter.toDomain(body);
    const order = await OrderUseCase.createOrder(
      orderBody,
      orderGateway,
      userGateway,
      productGateway,
    );
    await PaymentController.createPayment(order, dbConnection);
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
    status: OrderStatus,
    dbConnection: IConnection,
  ): Promise<OrderResponseDTO> {
    const gateway = new OrderGateway(dbConnection);
    const order = await OrderUseCase.updateOrder(id, status, gateway);

    const response = OrderAdapter.toDTO(order);
    return response;
  }

  static async updateOrderStatus(
      id: string,
      body: OrderStatusUpdateDTO,
      dbConnection: IConnection,
  ): Promise<OrderResponseDTO> {
    const gateway = new OrderGateway(dbConnection);
    const orderBody = await OrderAdapter.toOrderUpdateDomain(body);
    const order = await OrderUseCase.updateOrder(id, orderBody, gateway);

    return OrderAdapter.toDTO(order);
  }
}
