import { Controller, Get, HttpStatus, Param, Post, Res , Req} from "@nestjs/common";
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
    await this.userService.createProduct(request.body);
    return response.status(HttpStatus.OK);
  }
}
