import OrderAdapter from 'src/core/application/adapter/OrderAdapter';
import { OrderCreationDTO } from 'src/core/application/dto/OrderCreationDTO';
import { OrderResponseDTO } from 'src/core/application/dto/OrderResponseDTO';
import { IConnection } from 'src/infrastructure/adapters/external/IConnection';
import OrderUseCase from 'src/core/application/usecase/OrderUseCase';
import OrderGateway from '../adapters/gateway/OrderGateway';
import { OrderStatus } from '../../core/domain/enums/OrderStatus';
import { PaymentController } from './PaymentController';
import UserGateway from '../adapters/gateway/UserGateway';
import ProductGateway from '../adapters/gateway/ProductGateway';
import { IOrderGateway } from '../../core/application/repositories/IOrderGateway';
import { IUserGateway } from '../../core/application/repositories/IUserGateway';
import { IProductGateway } from '../../core/application/repositories/IProductGateway';
import MercadoPagoPaymentGateway from '../adapters/external/MercadoPagoPaymentGateway';

export class OrderController {
  static async createOrder(
    body: OrderCreationDTO,
    dbConnection: IConnection,
  ): Promise<OrderResponseDTO> {
    const orderGateway: IOrderGateway = new OrderGateway(dbConnection);
    const userGateway: IUserGateway = new UserGateway(dbConnection);
    const productGateway: IProductGateway = new ProductGateway(dbConnection);
    const paymentGateway = new MercadoPagoPaymentGateway(dbConnection);
    const orderBody = await OrderAdapter.toDomain(body);
    const order = await OrderUseCase.createOrder(
      orderBody,
      orderGateway,
      userGateway,
      productGateway,
      paymentGateway,
    );
    await PaymentController.createPayment(order, dbConnection);
    return OrderAdapter.toDTO(order);
  }

  static async getAllOrders(
    params: any,
    dbConnection: IConnection,
  ): Promise<Array<OrderResponseDTO>> {
    const gateway = new OrderGateway(dbConnection);
    const orders = await OrderUseCase.getAllOrders(params, gateway);

    return OrderAdapter.toDTOList(orders);
  }

  static async getSortedOrders(
    params: any,
    dbConnection: IConnection,
  ): Promise<Array<OrderResponseDTO>> {
    const gateway = new OrderGateway(dbConnection);
    const orders = await OrderUseCase.getSortedOrders(params, gateway);

    return OrderAdapter.toDTOList(orders);
  }

  static async getOrderById(
    id: string,
    dbConnection: IConnection,
  ): Promise<OrderResponseDTO> {
    const gateway = new OrderGateway(dbConnection);
    const order = await OrderUseCase.getOrderById(id, gateway);

    return OrderAdapter.toDTO(order);
  }

  static async updateOrder(
    id: string,
    status: OrderStatus,
    dbConnection: IConnection,
  ): Promise<OrderResponseDTO> {
    const gateway = new OrderGateway(dbConnection);
    const order = await OrderUseCase.updateOrder(id, status, gateway);

    return OrderAdapter.toDTO(order);
  }
}
