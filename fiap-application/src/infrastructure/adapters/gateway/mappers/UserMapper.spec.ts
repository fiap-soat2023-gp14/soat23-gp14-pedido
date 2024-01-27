import UserMapper from './UserMapper';
import { UserMock } from '../../../mocks/UserMock';
import { CPF } from '../../../../core/domain/valueObjects/Cpf';
import { UserEntity } from '../entity/UserEntity';
import User from '../../../../core/domain/entities/User';

describe('UserMapper', () => {
  describe('toDomain', () => {
    it('should convert a UserEntity to a User domain object', async () => {
      // Arrange
      const userEntity: UserEntity = UserMock.getUserEntity();

      // Act
      const result = await UserMapper.toDomain(userEntity);

      // Assert
      expect(result).toEqual({
        id: userEntity._id,
        name: userEntity.name,
        email: userEntity.email,
        cpf: await CPF.create(userEntity.cpf),
        phone: userEntity.phone,
        createdAt: userEntity.createdAt,
        updatedAt: userEntity.updatedAt,
      });
    });
  });

  describe('toEntity', () => {
    it('should convert a User domain object to a UserEntity', async () => {
      // Arrange
      const user: User = await UserMock.getUser();

      // Act
      const result = UserMapper.toEntity(user);

      // Assert
      expect(result).toEqual({
        _id: user.id,
        name: user.name,
        email: user.email,
        cpf: user.cpf.value,
        phone: user.phone,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    });
  });

  describe('toDomainList', () => {
    it('should convert an array of UserEntity to an array of User domain objects', async () => {
      // Arrange
      const userEntities: UserEntity[] = UserMock.getUserEntityList();

      // Act
      const result = await UserMapper.toDomainList(userEntities);

      // Assert
      expect(result).toEqual([
        {
          id: '123',
          name: 'Test User 1',
          email: 'test1@example.com',
          cpf: expect.any(CPF),
          phone: '1234567890',
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
        {
          id: '456',
          name: 'Test User 2',
          email: 'test2@example.com',
          cpf: expect.any(CPF), // TODO: Mock the CPF.create method to return a valid CPF instance
          phone: '0987654321',
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ]);
    });
  });
});
