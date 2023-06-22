import { Controller, Get, HttpStatus, Param, Res } from "@nestjs/common";
import GetProductService from '../../core/application/service/getProductService';

@Controller('products/')
export default class ProductController {
  constructor(private readonly userService: GetProductService) {}

  @Get(':id')
  public async getProduct(@Res() response, @Param('id') id) {
    const product = await this.userService.getProductById(id);
    return response.status(HttpStatus.OK).json(product);
  }
}
