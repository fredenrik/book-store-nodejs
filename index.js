import Server from './models/server.js';

import dotenv from 'dotenv'

dotenv.config();

const server = new Server();
server.uriConnectionDB = process.env.MONGODB_ROOT;
server.listen();