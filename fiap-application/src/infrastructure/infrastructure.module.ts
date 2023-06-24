import { Module } from "@nestjs/common";

import ProductController from "./controllers/productController";
import ApplicationModule from "../core/application/application.module";
import MongoDBAdapter from "./MongoDBAdapter";

@Module({
  imports: [ApplicationModule],
  controllers: [ProductController],
  providers: [MongoDBAdapter],
  exports: [MongoDBAdapter],
})
export default class InfrastructureModule {}