import {IOrderRepository} from "../../../core/domain/repositories/IOrderRepository";
import {Inject, Injectable} from "@nestjs/common";
import MongoDBAdapter from "../../MongoDBAdapter";
import {v4} from "uuid";
import {Order} from "../../../core/domain/entities/Order";

@Injectable()
export default class OrderRepository implements IOrderRepository {

    COLLECTION_NAME = 'Orders';

    constructor(@Inject('MongoDBAdapter') private mongoDbAdapter: MongoDBAdapter) {
    }
    public async create(order: Order): Promise<Order> {
        const orderEntity = { ...order, _id: v4() };
        const orderCreated = await this.mongoDbAdapter.getCollection(this.COLLECTION_NAME).insertOne(orderEntity);
        console.log('Order created successfully.');

        return Promise.resolve(orderCreated);
    }

    getAll(): Promise<Order[]> {
        return this.mongoDbAdapter.getCollection(this.COLLECTION_NAME).find({}).toArray()
    }

    getById(id: string): Promise<Order> {
        return this.mongoDbAdapter.getCollection(this.COLLECTION_NAME).findOne({ _id: id }  );
    }

    update(id: string, order: Order): Promise<Order> {
        return Promise.resolve(undefined);
    }

}