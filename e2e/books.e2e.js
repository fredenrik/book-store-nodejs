
const request = require("supertest");
import dotenv from 'dotenv'
import {Book} from '../models/book.js';
import mongoose from 'mongoose';
import express from 'express';
import books from '../routes/books.js';

describe('Test for hello endpoint', () => {
  let app = null;
  let server = null;
  let appServer = null;

  beforeAll(async () => {
    dotenv.config();
    jest.resetModules();

    app = express();
    server = await mongoose
      .connect(process.env.MONGODB_LOCAL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    app.use(express.json());
    app.use(express.static('public'));
    app.use('/books', books);

    appServer =  await app.listen(process.env.PORT, () => {
      console.log(`App is listening to port: ${process.env.PORT}`);
    });
  });

  afterAll(async () => {
    appServer.close();
    await mongoose.connection.db.dropCollection('books', (response) => {
      console.log(response);
    })
    await mongoose.disconnect();
  });

  describe('test for [GET] /books', () => {
    test('should return list books', async () => {
      //Arrange
      const seedData = await Book.insertMany([
        {
          title: 'Sleek Cotton Keyboard',
          author: 'Kate Wiza IV',
          publishYear: 1952,
        },
        {
          title: 'Sleek Cotton Cheese',
          author: 'Sheryl Donnelly',
          publishYear: 1986,
        },
      ]);
      console.log('SEEDDATA', seedData);

      //Act
      const { body, status } = await request(app).get('/books');

      //Assert
      expect(status).toEqual(200);
      expect(body.data.length).toEqual(seedData.length);
    });
  });
});