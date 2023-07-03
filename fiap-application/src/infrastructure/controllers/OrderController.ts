import OrderService from '../../core/application/service/OrderService';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { OrderCreationDTO } from '../../core/application/dto/OrderCreationDTO';

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
  async getAllOrders() {
    return await this.orderService.getAllOrders();
  }
  @Get(':id')
  async getOrderById(id) {
    return await this.orderService.getOrderById(id);
  }
  @Put(':id')
  async updateOrder(id, order) {
    return await this.orderService.updateOrder(id, order);
  }
}
