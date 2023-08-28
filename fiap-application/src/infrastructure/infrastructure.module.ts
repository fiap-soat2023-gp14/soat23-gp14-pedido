import { Module } from '@nestjs/common';

import ApplicationModule from '../core/application/application.module';
import MongoConnection from './MongoConnection';
import OrderApi from './api/OrderApi';
import ProductApi from './api/ProductApi';
import UserApi from './api/UserApi';

@Module({
  imports: [ApplicationModule],
  controllers: [ProductApi, OrderApi, UserApi],
  providers: [MongoConnection],
  exports: [MongoConnection],
})
export default class InfrastructureModule {}
