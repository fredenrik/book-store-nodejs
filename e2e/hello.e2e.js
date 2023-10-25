// const Server = require('../models/server.js');
import mongoose from 'mongoose';

const request = require("supertest");
import Server from '../models/server.js';
// import request from 'supertest';
import dotenv from 'dotenv'

describe('Test for hello endpoint', () => {
  // let app = null;
  let server = null;
  let appServer = null;

  beforeAll(async () => {
    dotenv.config();
    jest.resetModules();
    server = new Server();
    server.uri = process.env.MONGODB_LOCAL;
    appServer = server.listen();
  });

  afterAll(async () => {
    appServer.close();
    await mongoose.disconnect();
  });

  describe('test for [GET] /', () => {
    test('should return "Hello word!"', async () => {
      const response = await request(server.app).get('/api');
      expect(response.status).toEqual(403);
      expect(response.text).toEqual('Welcome to MERN stack tutorial');
    });
  });
});