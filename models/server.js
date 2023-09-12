import express from 'express';
import mongoose from 'mongoose';
import {mongoDBURL, PORT} from '../config.js';
import booksRoute from '../routes/books.js';
import cors from 'cors';

export default class Server {
  constructor() {
    this.app = express();
    this.port = PORT;
    this.pathBooks = '/books';

    // Middlewares
    this.middlewares();

    this.routes();
  }

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

    this.app.use(this.pathBooks, booksRoute);
  }

  listen() {
    mongoose
      .connect(mongoDBURL)
      .then(() => {
        console.log('App connected to database');
        this.app.listen(this.port, () => {
          console.log(`App is listening to port: ${this.port}`);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
};