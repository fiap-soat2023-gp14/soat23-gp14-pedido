import AWS from "aws-sdk";
import { Injectable } from "@nestjs/common";

@Injectable()
class DynamoDBAdapter {
  public createProduct(params) {
    const dynamodb = new AWS.DynamoDB.DocumentClient(this.AWSConfig());
    return dynamodb.put(params).promise();
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