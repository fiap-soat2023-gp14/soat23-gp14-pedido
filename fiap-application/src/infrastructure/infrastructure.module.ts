import { Module } from "@nestjs/common";

import ProductController from "./controllers/productController";
import ApplicationModule from "../core/application/application.module";
import DynamoDBAdapter from "./DynamoDBAdapter";

@Module({
  imports: [ApplicationModule],
  controllers: [ProductController],
  providers: [DynamoDBAdapter],
  exports: [DynamoDBAdapter],
})
export default class InfrastructureModule {}