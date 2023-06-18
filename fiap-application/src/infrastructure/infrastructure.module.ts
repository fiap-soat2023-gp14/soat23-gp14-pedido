import { Module } from "@nestjs/common";

import ProductController from "./controllers/productController";
import ApplicationModule from "../core/application/application.module";

@Module({
  imports: [ApplicationModule],
  controllers: [ProductController],
  providers: [],
  exports: [],
})
export default class InfrastructureModule {}
