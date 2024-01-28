import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { IConnection } from './IConnection';

@Injectable()
export class MongoConnection implements IConnection {
  client: any;
  constructor() {
    this.client = new MongoClient(
      process.env.MONGODB_CONNECTION_STRING
        ? process.env.MONGODB_CONNECTION_STRING
        : 'mongodb://localhost:27017/fiap',
      {
        tlsCAFile: 'global-bundle.pem',
      },
    );
  }
  async connect() {
    try {
      await this.client.connect();
      console.log('Connected to MongoDB successfully.');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  }
  public getCollection(collectionName) {
    return this.client.db().collection(collectionName);
  }
}
