import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { Injectable } from "@nestjs/common";

@Injectable()
class DynamoDBAdapter {
  public createProduct(params) {
    console.log('Regions: ', process.env.AWS_REGION);
    console.log('Localstack: ', process.env.USE_LOCALSTACK);
    console.log('Localstack endpoint: ', process.env.LOCALSTACK_ENDPOINT);
    console.log(
      'Localstack access key id: ',
      process.env.LOCALSTACK_ACCESS_KEY_ID,
    );
    console.log('AWS Config: ', this.AWSConfig());
    const dynamodb = DynamoDBDocument.from(new DynamoDB(this.AWSConfig()), {
      marshallOptions: {
        removeUndefinedValues: true,
        convertClassInstanceToMap: true,
      },
    });
    return dynamodb.put(params);
  }
  AWSConfig() {
    return process.env.USE_LOCALSTACK
      ? {
          region: process.env.AWS_REGION,
          endpoint: process.env.LOCALSTACK_ENDPOINT,
          accessKeyId: process.env.LOCALSTACK_ACCESS_KEY_ID,
          secretAccessKey: process.env.LOCALSTACK_SECRET_ACCESS_KEY,
        }
      : {
          region: process.env.AWS_REGION,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        };
  }
}

export default DynamoDBAdapter;