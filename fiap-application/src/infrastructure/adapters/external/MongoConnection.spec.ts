import { MongoConnection } from './MongoConnection';
import { MongoClient } from 'mongodb';

jest.mock('mongodb');

describe('MongoConnection', () => {
  let mongoConnection: MongoConnection;

  beforeAll(() => {
    // Set up any necessary environment variables or test data
  });

  beforeEach(() => {
    mongoConnection = new MongoConnection();
  });

  afterAll(() => {
    // Clean up any resources used by the tests
  });

  describe('connect', () => {
    it('should connect to MongoDB successfully', async () => {
      // Mock any necessary dependencies or setup test data

      await mongoConnection.connect();

      // Assert that the connection was successful
      // You can use a library like `jest` or `chai` for assertions
      expect(MongoClient).toBeCalledTimes(1);
    });

    it('should throw an error if connection fails', async () => {
      // Mock any necessary dependencies or setup test data

      // Force the connection to fail
      // You can use a library like `jest` or `sinon` to mock dependencies
      jest
        .spyOn(mongoConnection.client, 'connect')
        .mockRejectedValue(new Error('Connection failed'));

      // Assert that an error is thrown when connecting
      await expect(mongoConnection.connect()).rejects.toThrowError(
        'Connection failed',
      );
    });
  });

  // describe('getCollection', () => {
  //   it('should return the specified collection', () => {
  //     // Mock any necessary dependencies or setup test data
  //
  //     const collectionName = 'testCollection';
  //     jest
  //       .spyOn(mongoConnection.client.db, 'collection')
  //       .mockRejectedValue(Collection);
  //
  //
  //
  //     const collection = mongoConnection.getCollection(collectionName);
  //
  //     // Assert that the returned collection is correct
  //     expect(collection.collectionName).toBe(collectionName);
  //   });
  // });
});
