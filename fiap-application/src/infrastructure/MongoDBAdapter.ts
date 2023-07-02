import { MongoClient } from 'mongodb';
import { Injectable } from '@nestjs/common';
import { IMongoDBAdapter } from "../core/domain/repositories/IMongoDBAdapter";

@Injectable()
class MongoDBAdapter implements IMongoDBAdapter{
  private client: any;
  constructor() {
    // this.client = new MongoClient(process.env.MONGODB_CONNECTION_STRING);
    this.client = new MongoClient('mongodb://localhost:27017/fiap');
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

export default MongoDBAdapter;
