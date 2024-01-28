import { ValidationException } from './ValidationException';
import { HttpStatus } from '@nestjs/common';

describe('ValidationException', () => {
  it('should create an instance of ValidationException with the correct message and status code', () => {
    const errorMessage = 'Validation failed';

    const exception = new ValidationException(errorMessage);

    expect(exception).toBeInstanceOf(ValidationException);
    expect(exception.message).toBe(errorMessage);
    expect(exception.getStatus()).toBe(HttpStatus.BAD_REQUEST);
  });
});
