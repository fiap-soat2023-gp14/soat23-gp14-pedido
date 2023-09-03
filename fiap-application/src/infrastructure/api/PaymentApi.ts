import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  Res,
} from '@nestjs/common';
import { PaymentFeedbackDTO } from '../../core/application/dto/PaymentFeedbackDTO';
import { PaymentController } from '../controller/PaymentController';
import { IConnection } from '../adapters/external/IConnection';

@Controller('payments/')
export default class PaymentApi {
  constructor(@Inject(IConnection) private readonly dbConnection: IConnection) {}

  @Post()
  public async receivePaymentFeedback(
    @Body() body: PaymentFeedbackDTO,
    @Res() response,
  ){
    await PaymentController.receivePaymentFeedback(body, this.dbConnection);
    return response.status(HttpStatus.OK).json();
  }
}
