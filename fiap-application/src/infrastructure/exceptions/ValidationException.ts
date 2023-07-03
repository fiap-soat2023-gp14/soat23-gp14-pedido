import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
  constructor(message) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
