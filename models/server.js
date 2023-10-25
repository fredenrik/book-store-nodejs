import express from 'express';
import cors from 'cors';

import {mongodbConnection} from '../database/config.js';
import books from '../routes/books.js';
import users from '../routes/users.js';

export default class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.uri = process.env.MONGODB_CNN;

    // Connection database
    this.connectionDB();

    // Middlewares
    this.middlewares();

    this.routes();
  };

  async connectionDB() {
    await mongodbConnection(this.uri);
  };

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.get('/api', (req, res) => {
      res.status(403).send('Welcome to MERN stack tutorial');
    });

    this.app.use('/books', books);
    this.app.use('/users', users);
  }

  listen() {
    return this.app.listen(this.port, () => {
      console.log(`App is listening to port: ${this.port}`);
    });
  }
};