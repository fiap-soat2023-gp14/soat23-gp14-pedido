import { SqsService } from '@ssut/nestjs-sqs';
import { MessageProducer } from './MessageProducer';
import { config } from '../../config';
import { Test, TestingModule } from '@nestjs/testing';

jest.mock('@ssut/nestjs-sqs', () => ({
    SqsService: jest.fn().mockImplementation(() => ({
      send: jest.fn().mockResolvedValue({}), // Adjust behavior as needed
    })),
  }));
  

 
describe('MessageProducer', () => {
    let messageProducer: MessageProducer;
    let sqsService: SqsService;

    const consoleLogMock = jest.spyOn(console, 'log').mockImplementation(() => {});
   
    beforeEach(async() => {
        consoleLogMock.mockRestore();
        const module: TestingModule = await Test.createTestingModule({
            providers: [MessageProducer, SqsService],
          }).compile();

          // messageProducer = module.get<MessageProducer>(MessageProducer);
          sqsService = module.get<SqsService>(SqsService);
          messageProducer = new MessageProducer(sqsService);
    });

    it('should send a message successfully', async () => {
        // Set up test data
        const body = { id: 123, status: 'APPROVED' };
        const expectedMessage = { id: 123, body: JSON.stringify(body) };

        // Mock the SqsService.send method
        (sqsService.send as jest.Mock).mockResolvedValueOnce({});

        // Call the sendMessage method
        await messageProducer.sendMessage(body);

        // Assert expected behavior
        expect(sqsService.send).toHaveBeenCalledTimes(1);
        expect(sqsService.send).toHaveBeenCalledWith(config.AWS_PEDIDOS_QUEUE, expectedMessage);
    });

});
