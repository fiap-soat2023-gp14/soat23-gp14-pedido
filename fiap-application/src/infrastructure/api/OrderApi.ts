import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { OrderCreationDTO } from 'src/core/application/dto/OrderCreationDTO';
import { OrderResponseDTO } from 'src/core/application/dto/OrderResponseDTO';
import { OrderStatus } from 'src/core/domain/enums/OrderStatus';
import { OrderController } from '../controller/OrderController';
import { OrderStatusUpdateDTO } from '../../core/application/dto/OrderStatusUpdateDTO';
import { IConnection } from '../adapters/external/IConnection';
import { MessageProducer } from '../adapters/external/MessageProducer';

@Controller('orders/')
export default class OrderApi {
  constructor(
    @Inject(IConnection) private readonly dbConnection: IConnection,
    private messageProducer: MessageProducer,
  ) {}
  @Get()
  public async getAllOrders(
    @Res() response,
    @Query('status') status: OrderStatus,
  ): Promise<Array<OrderResponseDTO>> {
    const params = status ? { status: status } : {};
    const orderController = new OrderController();
    const orders = await orderController.getAllOrders(
      params,
      this.dbConnection,
    );
    return response.status(HttpStatus.OK).json(orders);
  }

  @Get('/sorted/')
  public async getSorted(@Res() response): Promise<Array<OrderResponseDTO>> {
    const orderController = new OrderController();
    const orders = await orderController.getSortedOrders({}, this.dbConnection);
    return response.status(HttpStatus.OK).json(orders);
  }

  @Get(':id')
  public async getOrders(
    @Res() response,
    @Param('id') id: string,
  ): Promise<OrderResponseDTO> {
    const orderController = new OrderController();
    const order = await orderController.getOrderById(id, this.dbConnection);
    return response.status(HttpStatus.OK).json(order);
  }

  @Post()
  public async createOrder(
    @Res() response,
    @Req() req,
    @Body() body: OrderCreationDTO,
  ) {
    const orderController = new OrderController();
    const order = await orderController.createOrder(
      body,
      req.headers['authorization'],
      this.dbConnection, this.messageProducer
    );
    return response.status(HttpStatus.OK).json(order);
  }

  @Put(':id')
  public async updateOrder(
    @Res() response,
    @Param('id') id: string,
    @Body() body: OrderStatusUpdateDTO,
  ): Promise<OrderResponseDTO> {
    const orderController = new OrderController();
    const order = await orderController.updateOrder(
      id,
      body.status,
      this.dbConnection,
    );
    return response.status(HttpStatus.OK).json(order);
  }
}
