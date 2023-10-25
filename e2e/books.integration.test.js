import {generateManyBook} from '../fakes/book.fake.js';

const request = require("supertest");
import Server from '../models/server.js';
import dotenv from 'dotenv'
import {Book} from '../models/book.js';

describe('Test for hello endpoint', () => {
  let server = null;
  let appServer = null;

  beforeAll(async () => {
    dotenv.config();
    jest.resetModules();
    server = new Server();
    appServer = server.listen();
  });

  afterAll(async () => {
    await appServer.close();
  });

  describe('test for [GET] /books', () => {
    test('should return list books', async () => {
      //Arrange
      const fakeBooks = generateManyBook(3);
      const findSpy = jest.spyOn(Book, 'find');
      findSpy.mockResolvedValue(fakeBooks);

      //Act
      const { body, status } = await request(server.app).get('/books');
      //Assert
      expect(status).toEqual(200);
      expect(body.data.length).toEqual(3);
    });
  });
});