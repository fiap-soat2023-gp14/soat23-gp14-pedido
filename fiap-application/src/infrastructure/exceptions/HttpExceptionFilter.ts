import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  Logger,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export default class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const { message, status } = this.isBusinessException(exception);
    response.status(status).json({
      message,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public isBusinessException(exception: HttpException): any {
    Logger.log(exception.stack);
    return {
      message: exception.message,
      status: exception.getStatus(),
    };
  }
}
