import {Module} from '@nestjs/common';
import {SqsModule} from '@ssut/nestjs-sqs';
import {MessageProducer} from './MessageProducer';
import * as AWS from 'aws-sdk';
import {config} from '../../config';
import {MessageHandler} from './MessageConsumer';
import {IConnection} from "./IConnection";
import {MongoConnection} from "./MongoConnection";

@Module({
    imports: [
        SqsModule.register({
            consumers: [
                {
                    name: config.AWS_PEDIDOS_RESPONSE_QUEUE,
                    queueUrl: config.AWS_PEDIDOS_RESPONSE_QUEUE_URL,
                    region: config.AWS_REGION,
                },
            ],
            producers: [
                {
                    name: config.AWS_PEDIDOS_QUEUE, // name of the queue
                    queueUrl: config.AWS_PEDIDOS_QUEUE_URL,
                    region: config.AWS_REGION, // url of the queue
                },
            ],
        }),
    ],
    controllers: [],
    providers: [
        MessageHandler,
        MessageProducer,
        {
            provide: IConnection,
            useClass: MongoConnection,
        },
    ],

    exports: [MessageHandler, MessageProducer]
})
export class QueuesModule {
}