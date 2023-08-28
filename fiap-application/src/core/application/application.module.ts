import { Module } from '@nestjs/common';
import UserGateway from 'src/infrastructure/adapters/gateway/UserGateway';
import MongoConnection from '../../infrastructure/MongoConnection';
import PaymentGateway from '../../infrastructure/adapters/external/PaymentGateway';
import OrderGateway from '../../infrastructure/adapters/gateway/OrderGateway';
import ProductGateway from '../../infrastructure/adapters/gateway/ProductGateway';
import DomainModule from '../domain/domain.module';
import OrderUseCase from './usecase/OrderUseCase';
import ProductUseCase from './usecase/ProductUseCase';
import UserUseCase from './usecase/UserUseCase';

@Module({
  imports: [DomainModule],
  controllers: [],
  providers: [
    ProductUseCase,
    {
      provide: 'IProductRepository',
      useClass: ProductGateway,
    },
    OrderUseCase,
    {
      provide: 'IOrderRepository',
      useClass: OrderGateway,
    },
    {
      provide: 'IPaymentGateway',
      useClass: PaymentGateway,
    },
    UserUseCase,
    {
      provide: 'IUserRepository',
      useClass: UserGateway,
    },
    {
      provide: 'IMongoDBAdapter',
      useClass: MongoConnection,
    },
  ],
  exports: [ProductUseCase, OrderUseCase, UserUseCase],
})
export default class ApplicationModule {}
