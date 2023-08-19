import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { UserCreationDTO } from 'src/core/application/dto/UserCreationDTO';
import UserService from 'src/core/application/usecase/UserService';
import UserFilter from 'src/core/domain/entities/UserFilter';

@Controller('users')
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Res() response, @Body() userCreationDto: UserCreationDTO) {
    const user = await this.userService.createUser(userCreationDto);
    return response.status(HttpStatus.OK).json(user);
  }

  @Get()
  getAllUsers(@Query() params: UserFilter) {
    return this.userService.getAllUsers(params);
  }

  @Get('/:id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Put('/:id')
  async updateUser(
    @Res() response,
    @Param('id') id: string,
    @Body() userDto: UserCreationDTO,
  ) {
    await this.userService.updateUser(id, userDto);
    return response.status(HttpStatus.OK).json();
  }
}
