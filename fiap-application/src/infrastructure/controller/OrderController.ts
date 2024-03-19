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
import PaymentGateway from '../adapters/gateway/PaymentGateway';
import { PaymentMapper } from '../adapters/gateway/mappers/PaymentMapper';
import { MessageProducer } from '../adapters/external/MessageProducer';

export class OrderController {
  public async createOrder(
    body: OrderCreationDTO,
    oauthToken: string,
    dbConnection: IConnection,
    messageProducer: MessageProducer,
  ): Promise<OrderResponseDTO> {
    const orderGateway: IOrderGateway = new OrderGateway(dbConnection);
    const userGateway: IUserGateway = new UserGateway();
    const productGateway: IProductGateway = new ProductGateway();
    const paymentGateway: PaymentGateway = new PaymentGateway();
    const orderBody = await OrderAdapter.toDomain(body);
    const order = await OrderUseCase.createOrder(
      orderBody,
      oauthToken,
      orderGateway,
      userGateway,
      productGateway,
    );
    try {
      await PaymentController.receivePaymentFeedback(
        PaymentMapper.toPaymnent(order),
        paymentGateway,
        messageProducer,
      );
    } catch (e) {
      console.error(e);
      await OrderUseCase.updateOrder(
        order.id,
        OrderStatus.CANCELLED,
        orderGateway,
      );
      order.status = OrderStatus.CANCELLED;
    }
    return OrderAdapter.toDTO(order);
  }

  public async getAllOrders(
    params: any,
    dbConnection: IConnection,
  ): Promise<Array<OrderResponseDTO>> {
    const gateway = new OrderGateway(dbConnection);
    const orders = await OrderUseCase.getAllOrders(params, gateway);

    return OrderAdapter.toDTOList(orders);
  }

  public async getSortedOrders(
    params: any,
    dbConnection: IConnection,
  ): Promise<Array<OrderResponseDTO>> {
    const gateway = new OrderGateway(dbConnection);
    const orders = await OrderUseCase.getSortedOrders(params, gateway);

    return OrderAdapter.toDTOList(orders);
  }

  public async getOrderById(
    id: string,
    dbConnection: IConnection,
  ): Promise<OrderResponseDTO> {
    const gateway = new OrderGateway(dbConnection);
    const order = await OrderUseCase.getOrderById(id, gateway);

    return OrderAdapter.toDTO(order);
  }

  public async updateOrder(
    id: string,
    status: OrderStatus,
    dbConnection: IConnection,
  ): Promise<OrderResponseDTO> {
    const gateway = new OrderGateway(dbConnection);
    const order = await OrderUseCase.updateOrder(id, status, gateway);

    return OrderAdapter.toDTO(order);
  }

  public async removeUserData(
    id: string,
    oauthToken: string,
    dbConnection: IConnection,
  ): Promise<void> {
    try {
      const orderGateway: IOrderGateway = new OrderGateway(dbConnection);
      await orderGateway.removeUserData(id);
      const userGateway: IUserGateway = new UserGateway();
      await userGateway.removeUserById(id, oauthToken);
    } catch (e) {
      console.error(e);
    }
  }
}
