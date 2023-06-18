import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from "./app.module";


async function bootstrap() {
  const port = process.env.PORT ? Number(process.env.PORT) : 8080;
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  console.log('Microservice listening on port:', port);
}

bootstrap();
