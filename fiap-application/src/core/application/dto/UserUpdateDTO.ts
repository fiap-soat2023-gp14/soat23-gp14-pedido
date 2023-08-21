import { Length } from 'class-validator';

export class UserUpdateDTO {
  @Length(3, 50)
  name?: string;

  phone?: string;

  email?: string;

  updatedAt: Date;
}
