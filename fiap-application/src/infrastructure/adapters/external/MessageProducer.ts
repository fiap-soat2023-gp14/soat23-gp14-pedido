import { Injectable } from '@nestjs/common';
import { SqsService } from '@ssut/nestjs-sqs';
import { config } from '../../config';
@Injectable()
export class MessageProducer {
    constructor(private readonly sqsService: SqsService) { }
    async sendMessage(body: any) {

        const message: any = {
            id: body.id,
            body: JSON.stringify(body)
        }
        console.log('message', message);

        try {
            await this.sqsService.send(config.AWS_PEDIDOS_QUEUE, message);
        } catch (error) {
            console.log('error in producing message!', error);
        }

    }
}