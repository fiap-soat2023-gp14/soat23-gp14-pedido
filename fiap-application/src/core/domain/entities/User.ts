import { CPF } from '../valueObjects/Cpf';

export default class User {
  id: string;
  name: string;
  email: string;
  cpf: CPF;
  phone: string;
  createdAt: Date;
  updatedAt?: Date;

  constructor(id: string) {
    this.id = id;
  }
}
