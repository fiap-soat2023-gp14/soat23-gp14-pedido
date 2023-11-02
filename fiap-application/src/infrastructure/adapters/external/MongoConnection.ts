import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { IConnection } from './IConnection';

@Injectable()
export class MongoConnection implements IConnection {
  private client: any;
  constructor() {
    this.client = new MongoClient(process.env.MONGODB_CONNECTION_STRING, {
      tlsCAFile: 'global-bundle.pem',
    });
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
