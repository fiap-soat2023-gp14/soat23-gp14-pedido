import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { UserCreationDTO } from 'src/core/application/dto/UserCreationDTO';
import UserFilter from 'src/core/domain/entities/UserFilter';
import { UserController } from '../controller/UserController';
import { IConnection } from '../adapters/external/IConnection';

@Controller('users')
export default class UserApi {
  constructor(
    @Inject(IConnection) private readonly dbConnection: IConnection,
  ) {}
  @Post()
  async createUser(@Res() response, @Body() userCreationDto: UserCreationDTO) {
    const user = await UserController.createUser(
      userCreationDto,
      this.dbConnection,
    );
    return response.status(HttpStatus.OK).json(user);
  }

  @Get()
  getAllUsers(@Query() params: UserFilter) {
    return UserController.getAllUsers(params, this.dbConnection);
  }

  @Get('/:id')
  getUserById(@Param('id') id: string) {
    return UserController.getUserById(id, this.dbConnection);
  }

  @Put('/:id')
  async updateUser(
    @Res() response,
    @Param('id') id: string,
    @Body() userDto: UserCreationDTO,
  ) {
    await UserController.updateUser(id, userDto, this.dbConnection);
    return response.status(HttpStatus.OK).json();
  }
}
