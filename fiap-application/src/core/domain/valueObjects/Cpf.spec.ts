import { CPF } from "./Cpf";
import { ValidationException } from 'src/infrastructure/exceptions/ValidationException';

describe('CPF', () => {
  describe('create', () => {
    it('should create a CPF instance with sanitized value', async () => {
      const rawValue = '123.456.789-00';

      const cpf = await CPF.create(rawValue);

      expect(cpf).toBeInstanceOf(CPF);
      expect(cpf.value).toBe('12345678900');
    });
  });

  describe('validate', () => {
    it('should not throw an error for a valid CPF', async () => {
      const validCpfValue = '30141201037';
      const cpf = await CPF.create(validCpfValue);

      await expect(cpf.validate()).resolves.not.toThrow();
    });

    it('should throw ValidationException for an invalid CPF', async () => {
      const invalidCpfValue = '11111111111';
      const cpf = await CPF.create(invalidCpfValue);

      await expect(cpf.validate()).rejects.toThrow(ValidationException);
    });

    it('should throw ValidationException for a CPF with incorrect length', async () => {
      const invalidCpfValue = '123456789';
      const cpf = await CPF.create(invalidCpfValue);

      await expect(cpf.validate()).rejects.toThrow(ValidationException);
    });

    it('should throw ValidationException for a CPF with only zeros on verification code', async () => {
      const invalidCpfValue = '777.777.777-00';
      const cpf = await CPF.create(invalidCpfValue);

      await expect(cpf.validate()).rejects.toThrow(ValidationException);
    });

  });
});
