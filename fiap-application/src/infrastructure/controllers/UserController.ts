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
import { UserUpdateDTO } from 'src/core/application/dto/UserUpdateDTO';
import UserService from 'src/core/application/service/UserService';

@Controller('users/')
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Res() response, @Body() userCreationDto: UserCreationDTO) {
    const user = await this.userService.createUser(userCreationDto);
    return response.status(HttpStatus.OK).json(user);
  }

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Get()
  getUserByCpf(@Query('cpf') cpf: string) {
    return this.userService.getUserByCpf(cpf);
  }

  @Put(':id')
  async updateUser(
    @Res() response,
    @Param('id') id: string,
    @Body() userUpdateDto: UserUpdateDTO,
  ) {
    await this.userService.updateUser(id, userUpdateDto);
    return response.status(HttpStatus.OK).json();
  }
}
