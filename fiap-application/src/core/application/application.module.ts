import { Module } from "@nestjs/common";

import ProductService from "./service/productService";
import DomainModule from '../domain/domain.module';
import ProductRepository from "../../infrastructure/adapters/repository/productRepository";
import DynamoDBAdapter from "../../infrastructure/DynamoDBAdapter";

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
      provide: 'DynamoDBAdapter',
      useClass: DynamoDBAdapter,
    },
  ],
  exports: [ProductService],
})
export default class ApplicationModule {}
