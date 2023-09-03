import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ProductCategory } from 'src/core/domain/enums/ProductCategory';
import ProductDTO from '../../core/application/dto/ProductDTO';
import { ProductController } from '../controller/ProductController';
import { IConnection } from '../adapters/external/IConnection';

@Controller('products/')
export default class ProductApi {
  constructor(
    @Inject(IConnection) private readonly dbConnection: IConnection,
  ) {}
  @Get()
  public async getAllProducts(
    @Res() response,
    @Query('category') category: ProductCategory,
  ) {
    const params = category ? { category: category } : {};
    const products = await ProductController.getAllProducts(
      params,
      this.dbConnection,
    );
    return response.status(HttpStatus.OK).json(products);
  }

  @Get(':id')
  public async getProduct(@Res() response, @Param('id') id) {
    const product = await ProductController.getProductById(
      id,
      this.dbConnection,
    );
    return response.status(HttpStatus.OK).json(product);
  }

  @Post()
  public async createProduct(@Res() response, @Body() body: ProductDTO) {
    const productResponse = await ProductController.createProduct(
      body,
      this.dbConnection,
    );
    return response.status(HttpStatus.OK).json(productResponse);
  }

  @Put(':id')
  public async updateProduct(
    @Res() response,
    @Param('id') id,
    @Body() body: ProductDTO,
  ) {
    await ProductController.updateProduct(id, body, this.dbConnection);
    return response.status(HttpStatus.OK).json();
  }

  @Delete(':id')
  public async deleteProduct(@Res() response, @Param('id') id) {
    await ProductController.deleteProduct(id, this.dbConnection);
    return response.status(HttpStatus.OK).json();
  }
}
