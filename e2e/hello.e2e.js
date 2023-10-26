import mongoose from 'mongoose';
const request = require("supertest");
import dotenv from 'dotenv'
import express from 'express';

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
    app.get('/api', (req, res) => {
      res.status(403).send('Welcome to MERN stack tutorial');
    });

    appServer =  await app.listen(process.env.PORT, () => {
      console.log(`App is listening to port: ${process.env.PORT}`);
    });
  });

  afterAll(async () => {
    appServer.close();
    await mongoose.disconnect();
  });

  describe('test for [GET] /', () => {
    test('should return "Hello word!"', async () => {
      const response = await request(server.app).get('/api');
      expect(response.text).toEqual('Welcome to MERN stack tutorial');
    });
  });
});