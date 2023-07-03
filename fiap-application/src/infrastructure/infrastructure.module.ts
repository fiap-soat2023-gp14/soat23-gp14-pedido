import { Module } from '@nestjs/common';

import ProductController from './controllers/ProductController';
import ApplicationModule from '../core/application/application.module';
import MongoDBAdapter from './MongoDBAdapter';
import { OrderController } from './controllers/OrderController';
import UserController from './controllers/UserController';

@Module({
  imports: [ApplicationModule],
  controllers: [ProductController, OrderController, UserController],
  providers: [MongoDBAdapter],
  exports: [MongoDBAdapter],
})
export default class InfrastructureModule {}
