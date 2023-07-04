import { CPF } from "src/core/domain/valueObjects/Cpf";

export class UserResponseDTO {
  id: string;
  name: string;
  email: string;
  cpf: CPF;
  phone: string;
}
