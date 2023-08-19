import { Module } from '@nestjs/common';

import ProductUseCase from './usecase/ProductUseCase';
import DomainModule from '../domain/domain.module';
import ProductGateway from '../../infrastructure/adapters/gateway/ProductGateway';
import OrderService from './usecase/OrderService';
import OrderRepository from '../../infrastructure/adapters/gateway/OrderRepository';
import UserService from './usecase/UserService';
import UserRepository from 'src/infrastructure/adapters/gateway/UserRepository';
import PaymentGateway from '../../infrastructure/adapters/external/PaymentGateway';
import MongoConnection from "../../infrastructure/MongoConnection";

@Module({
  imports: [DomainModule],
  controllers: [],
  providers: [
    ProductUseCase,
    {
      provide: 'IProductRepository',
      useClass: ProductGateway,
    },
    OrderService,
    {
      provide: 'IOrderRepository',
      useClass: OrderRepository,
    },
    {
      provide: 'IPaymentGateway',
      useClass: PaymentGateway,
    },
    UserService,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'IMongoDBAdapter',
      useClass: MongoConnection,
    },
  ],
  exports: [ProductUseCase, OrderService, UserService],
})
export default class ApplicationModule {}
