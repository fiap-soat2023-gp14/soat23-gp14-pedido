import OrderService from "../../core/application/service/OrderService";
import {Controller, Get, HttpStatus, Inject, Post, Put, Req, Res} from "@nestjs/common";
import {response} from "express";

@Controller('orders/')
export class OrderController {
    constructor(private readonly orderService: OrderService){}

    @Post()
    async createOrder(@Res() response, @Req() request) {
        const order = await this.orderService.createOrder(request.body)
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