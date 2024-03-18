import {
  Controller,
  Delete,
  HttpStatus,
  Inject,
  Param, Req,
  Res,
} from '@nestjs/common';
import { UserController } from '../controller/UserController';
import { IConnection } from '../adapters/external/IConnection';

@Controller('users-data')
export default class UserDataApi {
  constructor(
    @Inject(UserController) private userController: UserController,
    @Inject(IConnection) private readonly dbConnection: IConnection,
  ) {}

  @Delete('/:id')
  async removeUserData(@Res() response, @Req() req, @Param('id') id: string) {
    await this.userController.removeUserData(
      id,
      req.headers['authorization'],
      this.dbConnection,
    );
    return response.status(HttpStatus.NO_CONTENT).json();
  }
}
