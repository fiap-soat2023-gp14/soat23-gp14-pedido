import { Module } from "@nestjs/common";

import ProductController from "./controllers/productController";
import ApplicationModule from "../core/application/application.module";
import MongoDBAdapter from "./MongoDBAdapter";
import {OrderController} from "./controllers/OrderController";

@Module({
  imports: [ApplicationModule],
  controllers: [ProductController, OrderController],
  providers: [MongoDBAdapter],
  exports: [MongoDBAdapter],
})
export default class InfrastructureModule {}