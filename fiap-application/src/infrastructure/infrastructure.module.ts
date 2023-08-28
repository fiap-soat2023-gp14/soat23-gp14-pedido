import { Module } from '@nestjs/common';

import ApplicationModule from '../core/application/application.module';
import OrderApi from './api/OrderApi';
import ProductApi from './api/ProductApi';
import UserApi from './api/UserApi';
import PaymentApi from './api/PaymentApi';
import { MongoConnection } from './MongoConnection';
import { IConnection } from './adapters/external/IConnection';

@Module({
  imports: [ApplicationModule],
  controllers: [ProductApi, OrderApi, UserApi, PaymentApi],
  providers: [
    {
      provide: IConnection,
      useClass: MongoConnection,
    },
  ]
})
export default class InfrastructureModule {}
