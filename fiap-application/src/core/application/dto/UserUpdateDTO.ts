import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class UserUpdateDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
