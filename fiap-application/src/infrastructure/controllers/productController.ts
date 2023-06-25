import { Controller, Get, HttpStatus, Param, Post, Res, Req, Put, Delete } from "@nestjs/common";
import ProductService from '../../core/application/service/productService';

@Controller('products/')
export default class ProductController {
  constructor(private readonly userService: ProductService) {}

  @Get(':id')
  public async getProduct(@Res() response, @Param('id') id) {
    const product = await this.userService.getProductById(id);
    return response.status(HttpStatus.OK).json(product);
  }

  @Post()
  public async createProduct(@Res() response, @Req() request) {
    const productResponse = await this.userService.createProduct(request.body);
    return response.status(HttpStatus.OK).json(productResponse);
  }

  @Put(':id')
  public async updateProduct(@Res() response, @Req() request, @Param('id') id) {
    await this.userService.updateProduct(id, request.body);
    return response.status(HttpStatus.OK).json();
  }

  @Delete(':id')
  public deleteProduct(@Res() response, @Param('id') id) {
    this.userService.deleteProduct(id);
    return response.status(HttpStatus.OK).json();
  }
}
