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
import { OrderStatus } from 'src/core/domain/enums/OrderStatus';
import { OrderCreationDTO } from '../../core/application/dto/OrderCreationDTO';
import OrderService from '../../core/application/usecase/OrderService';
import { OrderStatusUpdateDTO } from '../../core/application/dto/OrderStatusUpdateDTO';

@Controller('orders/')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(
    @Res() response,
    @Body() orderCreationDTO: OrderCreationDTO,
  ) {
    const order = await this.orderService.createOrder(orderCreationDTO);
    return response.status(HttpStatus.OK).json(order);
  }

  @Get()
  async getAllOrders(@Res() response, @Query('status') status: OrderStatus) {
    const params = status ? { status: status } : {};
    const orders = await this.orderService.getAllOrders(params);
    return response.status(HttpStatus.OK).json(orders);
  }

  @Get('/ordered/')
  async getOrdersOrdered(@Res() response) {
    const orders = await this.orderService.getOrdersOrdered();
    return response.status(HttpStatus.OK).json(orders);
  }

  @Get(':id')
  async getOrderById(@Param('id') id, @Res() response) {
    const order = await this.orderService.getOrderById(id);
    return response.status(HttpStatus.OK).json(order);
  }

  @Put(':id')
  async updateOrder(@Param('id') id, @Body() order: OrderStatusUpdateDTO) {
    return await this.orderService.updateOrder(id, order.status);
  }
}
