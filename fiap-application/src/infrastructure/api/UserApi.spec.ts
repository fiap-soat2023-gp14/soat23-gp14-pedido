import { Test, TestingModule } from '@nestjs/testing';
import UserApi from './UserApi';
import { HttpStatus } from '@nestjs/common';
import { UserController } from '../controller/UserController';
import {IConnection} from "../adapters/external/IConnection";

describe('UserApi', () => {
  let userApi: UserApi;
  let userControllerMock: UserController;
  let connectionMock: IConnection;
  let mockResponse: any;
  let mockRequest: any;

  beforeEach(async () => {
    userControllerMock = {
      removeUserData: jest.fn(),
    } as any;

    connectionMock = {
      connection: jest.fn(),
      getCollection: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserApi],
      providers: [
        { provide: UserController, useValue: userControllerMock },
        { provide: IConnection, useValue: connectionMock },
      ],
    }).compile();

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockRequest = {
      headers: jest.fn(),
    };

    userApi = module.get<UserApi>(UserApi);
  });

  it('should be defined', () => {
    expect(userApi).toBeDefined();
  });

  describe('removeUserData', () => {
    it('should call userController.removeUserData with id', async () => {
      const id = '3255ca79-f972-452b-8a90-9690f510b3fb';
      userControllerMock.removeUserData = jest.fn().mockResolvedValue({});

      await userApi.removeUserData(mockResponse, mockRequest, id);

      expect(userControllerMock.removeUserData).toBeCalledWith(id);
      expect(mockResponse.status).toBeCalledWith(HttpStatus.NO_CONTENT);
    });
  });
});