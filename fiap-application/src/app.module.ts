import { Module } from '@nestjs/common';
import ApplicationModule from './core/application/application.module';
import DomainModule from './core/domain/domain.module';
import InfrastructureModule from './infrastructure/infrastructure.module';

@Module({
  imports: [DomainModule, InfrastructureModule, ApplicationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
