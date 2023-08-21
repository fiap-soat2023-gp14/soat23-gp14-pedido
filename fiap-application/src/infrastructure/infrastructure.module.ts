import { Module } from '@nestjs/common';

import ApplicationModule from '../core/application/application.module';
import { OrderController } from './api/OrderController';
import UserApi from './api/UserApi';
import ProductApi from './api/ProductApi';
import MongoConnection from './MongoConnection';

@Module({
  imports: [ApplicationModule],
  controllers: [ProductApi, OrderController, UserApi],
  providers: [MongoConnection],
  exports: [MongoConnection],
})
export default class InfrastructureModule {}
