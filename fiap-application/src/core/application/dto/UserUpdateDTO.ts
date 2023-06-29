import { IsNotEmpty, IsString, IsEmail, Length } from "class-validator";

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