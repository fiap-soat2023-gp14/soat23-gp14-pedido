import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { OrderCreationDTO } from 'src/core/application/dto/OrderCreationDTO';
import { OrderResponseDTO } from 'src/core/application/dto/OrderResponseDTO';
import { IConnection } from 'src/core/application/repositories/IConnection';
import { OrderStatus } from 'src/core/domain/enums/OrderStatus';
import MongoConnection from '../MongoConnection';
import { OrderController } from '../controller/OrderController';

@Controller('orders/')
export default class OrderApi {
  private dbConnection: IConnection;
  constructor() {
    this.dbConnection = new MongoConnection();
  }

  @Get()
  public async getAllOrders(
    @Res() response,
    @Query('status') status: OrderStatus,
  ): Promise<Array<OrderResponseDTO>> {
    const params = status ? { status: status } : {};
    const orders = await OrderController.getAllOrders(
      params,
      this.dbConnection,
    );
    return response.status(HttpStatus.OK).json(orders);
  }

  @Get(':id')
  public async getOrders(
    @Res() response,
    @Param('id') id: string,
  ): Promise<OrderResponseDTO> {
    const order = await OrderController.getOrderById(id, this.dbConnection);
    return response.status(HttpStatus.OK).json(order);
  }

  @Get('/ordered/')
  public async getSorted(@Res() response): Promise<Array<OrderResponseDTO>> {
    const orders = await OrderController.getSortedOrders({}, this.dbConnection);
    return response.status(HttpStatus.OK).json(orders);
  }

  @Post()
  public async createOrder(@Res() response, @Body() body: OrderCreationDTO) {
    const order = await OrderController.createOrder(body, this.dbConnection);
    return response.status(HttpStatus.OK).json(order);
  }

  @Put(':id')
  public async updateOrder(
    @Res() response,
    @Param('id') id: string,
    @Body() body: OrderCreationDTO,
  ): Promise<OrderResponseDTO> {
    const order = await OrderController.updateOrder(
      id,
      body,
      this.dbConnection,
    );
    return response.status(HttpStatus.OK).json(order);
  }
}
