import {
  Controller,
  Delete,
  HttpStatus,
  Inject,
  Param,
  Req,
  Res,
} from '@nestjs/common';
import { IConnection } from '../adapters/external/IConnection';
import { OrderController } from '../controller/OrderController';

@Controller('orders/users-data/')
export default class UserDataApi {
  constructor(
    @Inject(IConnection) private readonly dbConnection: IConnection,
  ) {}

  @Delete(':id')
  async removeUserData(@Res() response, @Req() req, @Param('id') id: string) {
    const orderController = new OrderController();
    await orderController.removeUserData(
      id,
      req.headers['authorization'],
      this.dbConnection,
    );
    return response.status(HttpStatus.NO_CONTENT).json();
  }
}
