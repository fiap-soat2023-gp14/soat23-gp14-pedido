import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';

export class UserUpdateDTO {
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
