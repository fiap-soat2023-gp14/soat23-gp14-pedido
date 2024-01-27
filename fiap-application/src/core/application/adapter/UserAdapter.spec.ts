import { UserAdapter } from './UserAdapter';
import { CPF } from 'src/core/domain/valueObjects/Cpf';
import { UserCreationDTO } from '../dto/UserCreationDTO';
import { UserUpdateDTO } from '../dto/UserUpdateDTO';
import { UserResponseDTO } from '../dto/UserResponseDTO';
import { UserMock } from '../../../infrastructure/mocks/UserMock';

jest.mock('src/core/domain/valueObjects/Cpf', () => ({
  CPF: {
    create: jest.fn(),
  },
}));

describe('UserAdapter', () => {
  let userAdapter: UserAdapter;
  let mockCPF: any;

  beforeEach(() => {
    mockCPF = CPF.create as jest.Mock;
  });

  describe('toDomain', () => {
    it('should map a UserCreationDTO to a User', async () => {
      const userCreationDTO: UserCreationDTO = UserMock.getUserCreationDTO();

      mockCPF.mockResolvedValue({
        value: userCreationDTO.cpf,
        isValid: true,
      });

      const result = await UserAdapter.toDomain(userCreationDTO);

      expect(result).toEqual({
        id: userCreationDTO.id,
        name: userCreationDTO.name,
        email: userCreationDTO.email,
        cpf: {
          value: userCreationDTO.cpf,
          isValid: true,
        },
        phone: userCreationDTO.phone,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });

    it('should map a UserCreationDTO to a User', async () => {
      const userCreationDTO: UserCreationDTO = UserMock.getUserCreationDTO();

      const result = await UserAdapter.toDomain(userCreationDTO);

      expect(result).toStrictEqual({
        id: userCreationDTO.id,
        name: userCreationDTO.name,
        email: userCreationDTO.email,
        cpf: {
          value: userCreationDTO.cpf,
          isValid: true,
        },
        phone: userCreationDTO.phone,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
  });

  describe('toResponse', () => {
    it('should map a User to a UserResponseDTO', async () => {
      const user = await UserMock.getUser();

      const result = UserAdapter.toResponse(user);

      expect(result).toEqual({
        id: user.id,
        name: user.name,
        email: user.email,
        cpf: user.cpf.value,
        phone: user.phone,
      });
    });
  });

  describe('toUpdateDTO', () => {
    it('should map a UserUpdateDTO to a User', async () => {
      const userUpdateDTO: UserUpdateDTO = UserMock.getUserUpdateDTO();

      const result = UserAdapter.toUpdateDTO(userUpdateDTO);

      expect(result).toEqual({
        name: userUpdateDTO.name,
        email: userUpdateDTO.email,
        phone: userUpdateDTO.phone,
        updatedAt: expect.any(Date),
      });
    });
  });

  describe('toResponseList', () => {
    it('should map a list of User to a list of UserResponseDTO', async () => {
      const users = await UserMock.getUserList();

      const result = UserAdapter.toResponseList(users);

      expect(result).toEqual([
        {
          id: users[0].id,
          name: users[0].name,
          email: users[0].email,
          cpf: users[0].cpf.value,
          phone: users[0].phone,
        },
      ]);
    });
  });
});
