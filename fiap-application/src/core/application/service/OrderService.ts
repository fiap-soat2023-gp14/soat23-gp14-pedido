import {Injectable, Inject} from "@nestjs/common";
import {IOrderRepository} from "../../domain/repositories/IOrderRepository";

@Injectable()
export default class OrderService {

    constructor(
        @Inject('IOrderRepository') private orderRepository: IOrderRepository,
    ) {}

    public createOrder(order) {
        order.setStatus(OrderStatus.RECEIVED);
        return this.orderRepository.create(order);
    }

    public getAllOrders() {
        return this.orderRepository.getAll();
    }

    public getOrderById(id) {
        return this.orderRepository.getById(id);
    }

    public updateOrder(id, order) {
        return this.orderRepository.update(id, order);
    }

}