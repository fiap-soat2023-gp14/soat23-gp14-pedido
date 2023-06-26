import { Module } from "@nestjs/common";

import ProductService from "./service/productService";
import DomainModule from '../domain/domain.module';
import ProductRepository from "../../infrastructure/adapters/repository/productRepository";
import MongoDBAdapter from "../../infrastructure/MongoDBAdapter";
import OrderService from "./service/OrderService";
import OrderRepository from "../../infrastructure/adapters/repository/OrderRepository";

@Module({
  imports: [DomainModule],
  controllers: [],
  providers: [
    ProductService,
    OrderService,
    {
      provide: 'ProductRepository',
      useClass: ProductRepository,
    },
    {
      provide: 'MongoDBAdapter',
      useClass: MongoDBAdapter,
    },
    {
      provide: 'IOrderRepository',
      useClass: OrderRepository,

    },
  ],
  exports: [ProductService, OrderService],
})
export default class ApplicationModule {}
