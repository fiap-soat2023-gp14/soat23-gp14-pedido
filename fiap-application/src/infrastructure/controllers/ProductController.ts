import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  Req,
  Put,
  Delete,
  Body,
  Query,
} from "@nestjs/common";
import ProductService from '../../core/application/service/ProductService';

@Controller('products/')
export default class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  public async getAllProducts(
    @Res() response,
    @Query('category') category: ProductCategory,
  ) {
    const params = category ? { category: category } : {};
    const products = await this.productService.getAllProducts(params);
    return response.status(HttpStatus.OK).json(products);
  }
  @Get(':id')
  public async getProduct(@Res() response, @Param('id') id) {

    const product = await this.productService.getProductById(id);
    return response.status(HttpStatus.OK).json(product);
  }

  @Post()
  public async createProduct(@Res() response, @Body() body: ProductDTO) {
    const productResponse = await this.productService.createProduct(body);
    return response.status(HttpStatus.OK).json(productResponse);
  }

  @Put(':id')
  public async updateProduct(@Res() response, @Req() request, @Param('id') id) {
    await this.productService.updateProduct(id, request.body);
    return response.status(HttpStatus.OK).json();
  }

  @Delete(':id')
  public async deleteProduct(@Res() response, @Param('id') id) {
    await this.productService.deleteProduct(id);
    return response.status(HttpStatus.OK).json();
  }
}
