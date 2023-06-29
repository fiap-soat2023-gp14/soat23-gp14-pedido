import { Module } from "@nestjs/common";

import ProductService from "./service/productService";
import DomainModule from '../domain/domain.module';
import ProductRepository from "../../infrastructure/adapters/repository/productRepository";
import MongoDBAdapter from "../../infrastructure/MongoDBAdapter";
import OrderService from "./service/OrderService";
import OrderRepository from "../../infrastructure/adapters/repository/OrderRepository";
import UserService from "./service/UserService";
import UserRepository from "src/infrastructure/adapters/repository/UserRepository";

@Module({
  imports: [DomainModule],
  controllers: [],
  providers: [
    ProductService,
    {
      provide: 'IProductRepository',
      useClass: ProductRepository,
    },
    OrderService,
    {
      provide: 'IOrderRepository',
      useClass: OrderRepository,
    },
    UserService,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'MongoDBAdapter',
      useClass: MongoDBAdapter,
    },
  ],
  exports: [ProductService, OrderService, UserService],
})
export default class ApplicationModule { }
