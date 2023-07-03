export interface IMongoDBAdapter {
  connect(): Promise<void>;
  getCollection(collectionName: string);
}
