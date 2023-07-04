import { CPF } from '../../domain/valueObjects/Cpf';

export class UserResponseDTO {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
}
