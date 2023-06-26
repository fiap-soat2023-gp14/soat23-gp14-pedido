import { Module } from "@nestjs/common";

import ProductService from "./service/productService";
import DomainModule from '../domain/domain.module';
import ProductRepository from "../../infrastructure/adapters/repository/productRepository";
import MongoDBAdapter from "../../infrastructure/MongoDBAdapter";

@Module({
  imports: [DomainModule],
  controllers: [],
  providers: [
    ProductService,
    {
      provide: 'ProductRepository',
      useClass: ProductRepository,
    },
    {
      provide: 'MongoDBAdapter',
      useClass: MongoDBAdapter,
    },
  ],
  exports: [ProductService],
})
export default class ApplicationModule {}
