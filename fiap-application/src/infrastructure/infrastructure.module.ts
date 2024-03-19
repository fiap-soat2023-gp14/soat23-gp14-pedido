import { Module } from '@nestjs/common';

import ApplicationModule from '../core/application/application.module';
import OrderApi from './api/OrderApi';
import { MongoConnection } from './adapters/external/MongoConnection';
import { IConnection } from './adapters/external/IConnection';
import { QueuesModule } from './adapters/external/queues.module';
import UserDataApi from './api/UserApi';

@Module({
  imports: [ApplicationModule, QueuesModule],
  controllers: [OrderApi, UserDataApi],
  providers: [
    {
      provide: IConnection,
      useClass: MongoConnection,
    },
  ],
})
export default class InfrastructureModule {}
