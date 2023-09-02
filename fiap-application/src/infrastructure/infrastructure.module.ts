import { Module } from '@nestjs/common';

import ApplicationModule from '../core/application/application.module';
import OrderApi from './api/OrderApi';
import ProductApi from './api/ProductApi';
import UserApi from './api/UserApi';

@Module({
  imports: [ApplicationModule],
  controllers: [ProductApi, OrderApi, UserApi],
  providers: [],
  exports: [],
})
export default class InfrastructureModule {}
