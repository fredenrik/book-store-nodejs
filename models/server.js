import express from 'express';
import cors from 'cors';

import {mongodbConnection} from '../database/config.js';
import books from '../routes/books.js';
import users from '../routes/users.js';

export default class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.pathBooks = '/books';
    this.pathUsers = '/users';

    // Connection database
    this.connectionDB();

    // Middlewares
    this.middlewares();

    this.routes();
  };

  async connectionDB() {
    await mongodbConnection();
  };

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.get('/api', (req, res) => {
      res.status(403)
        .json({
          msg: 'get API',
        });
      // return res.status(234).send('Welcome to MERN stack tutorial');
    });

    this.app.use(this.pathBooks, books);
    this.app.use(this.pathUsers, users);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`App is listening to port: ${this.port}`);
    });
  }
};