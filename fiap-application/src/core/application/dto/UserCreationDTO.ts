import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';

export class UserCreationDTO {
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  @Length(11, 11)
  cpf: string;
}