import { CPF } from '../valueObjects/Cpf';

export default interface User {
  id: string;
  name: string;
  email: string;
  cpf: CPF;
  phone: string;
  createdAt: Date;
  updatedAt?: Date;
}
