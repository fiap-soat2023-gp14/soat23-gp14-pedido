import { Module } from "@nestjs/common";

import GetProductService from "./service/getProductService";
import DomainModule from '../domain/domain.module';
import ProductRepository from "../../infrastructure/adapters/repository/productRepository";

@Module({
  imports: [DomainModule],
  controllers: [],
  providers: [
    GetProductService,
    {
      provide: 'ProductRepository',
      useClass: ProductRepository,
    },
  ],
  exports: [GetProductService],
})
export default class ApplicationModule {}
