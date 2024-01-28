import { HttpNotFoundException } from './HttpNotFoundException';
import { HttpStatus } from '@nestjs/common';

describe('HttpNotFoundException', () => {
  it('should create an instance of HttpNotFoundException with the correct message and status code', () => {
    const errorMessage = 'Resource not found';

    const exception = new HttpNotFoundException(errorMessage);

    expect(exception).toBeInstanceOf(HttpNotFoundException);
    expect(exception.message).toBe(errorMessage);
    expect(exception.getStatus()).toBe(HttpStatus.NOT_FOUND);
  });
});
