export interface IConnection {
  connect(): Promise<void>;
  getCollection(collectionName: string);
}

export const IConnection = Symbol('IConnection');
