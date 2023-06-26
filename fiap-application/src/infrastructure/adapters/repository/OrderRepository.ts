import {IOrderRepository} from "../../../core/domain/repositories/IOrderRepository";
import {Inject, Injectable} from "@nestjs/common";
import MongoDBAdapter from "../../MongoDBAdapter";
import {v4} from "uuid";

@Injectable()
export default class OrderRepository implements IOrderRepository {

    COLLECTION_NAME = 'Orders';

    constructor(@Inject('MongoDBAdapter') private mongoDbAdapter: MongoDBAdapter) {
    }
    public async create(order: Order): Promise<Order> {
        const orderEntity = { ...order, _id: v4() };


        await this.mongoDbAdapter.getCollection(this.COLLECTION_NAME).insertOne(order);
        console.log('Order created successfully.');

        return Promise.resolve(undefined);
    }

    getAll(): Promise<Order[]> {
        return Promise.resolve([]);
    }

    getById(id: string): Promise<Order> {
        return Promise.resolve(undefined);
    }

    update(id: string, order: Order): Promise<Order> {
        return Promise.resolve(undefined);
    }

}