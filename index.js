import express from 'express';
import {PORT, mongoDBURL} from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/books.js';
import cors from 'cors';
import Server from './models/server.js';

const server = new Server();
server.listen();

// const app = express();

// Middleware for parsing request body
// app.use(express.json());

// Middleware for handing CORS POLICY
// option 1: Allow all origins with default of cors(*)
// app.use(cors());
// option 2: Allow custom origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

// app.get('/', (request, response) => {
//   console.log(request);
//   return response.status(234).send('Welcome to MERN stack tutorial');
// });
//
// app.use('/books', booksRoute);
//
// mongoose
//   .connect(mongoDBURL)
//   .then(() => {
//     console.log('App connected to database');
//     app.listen(PORT, () => {
//       console.log(`App is listening to port: ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error(error);
//   });