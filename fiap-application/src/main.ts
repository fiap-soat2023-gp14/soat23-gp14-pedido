import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import HttpExceptionFilter from './infrastructure/exceptions/HttpExceptionFilter';
import { ValidationPipe } from '@nestjs/common';

export async function bootstrap() {
  const port = process.env.PORT ? Number(process.env.PORT) : 8080;
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  console.log('Microservice listening on port:', port);
}

bootstrap();
