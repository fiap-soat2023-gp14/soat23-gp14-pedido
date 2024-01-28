import { Money } from './Money';
import { ValidationException } from '../../../infrastructure/exceptions/ValidationException';

describe('Money', () => {
  describe('create', () => {
    it('should create a Money instance with the provided value', async () => {
      // Arrange
      const value = 10;

      // Act
      const money = await Money.create(value);

      // Assert
      expect(money.value).toBe(value);
      expect(money.currency).toBe('BRL');
    });
  });

  describe('validate', () => {
    it('should throw a ValidationException if the value is less than or equal to 0', async () => {
      // Arrange
      const value = 0;
      const money = await Money.create(value);

      // Act & Assert
      await expect(money.validate()).rejects.toThrow(ValidationException);
    });

    it('should not throw a ValidationException if the value is greater than 0', async () => {
      // Arrange
      const value = 10;
      const money = await Money.create(value);

      // Act & Assert
      await expect(money.validate()).resolves.not.toThrow(ValidationException);
    });
  });
});