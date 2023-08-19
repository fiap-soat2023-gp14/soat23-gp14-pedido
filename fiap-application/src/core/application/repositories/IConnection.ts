export interface IConnection {
  connect(): Promise<void>;
  getCollection(collectionName: string);
}
