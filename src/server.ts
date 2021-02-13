import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import logging from './config/logging';
import config from './config/config';
import userRoutes from './routes/user';
import mongoose from 'mongoose';
import path from 'path';

const NAMESPACE = 'Server';

const router = express();

/** Create the server */

const httpServer = http.createServer(router);

//socketio
interface Rooms {
  [key: string]: string[];
}
const rooms: Rooms = {};
const socket = require('socket.io');
const io = socket(httpServer);

io.on('connection', (socket: any) => {
  socket.on('join room', (roomID: string) => {
    if (rooms[roomID]) {
      rooms[roomID].push(socket.id);
    } else {
      rooms[roomID] = [socket.id];
    }
    const otherUser = rooms[roomID].find((id) => id !== socket.id);
    if (otherUser) {
      socket.emit('other user', otherUser);
      socket.to(otherUser).emit('user joined', socket.id);
    }
  });

  socket.on('offer', (payload: { target: any }) => {
    io.to(payload.target).emit('offer', payload);
  });

  socket.on('answer', (payload: { target: any }) => {
    io.to(payload.target).emit('answer', payload);
  });

  socket.on('ice-candidate', (incoming: { target: any; candidate: any }) => {
    io.to(incoming.target).emit('ice-candidate', incoming.candidate);
  });
});

/** Connect to mongodb */
mongoose
  .connect(config.mongo.uri, config.mongo.options)
  .then((result) => {
    logging.info(NAMESPACE, 'Connected to MongoDB');
  })
  .catch((error) => {
    logging.error(NAMESPACE, error.message, error);
  });

/** Logging the request */

router.use((req, res, next) => {
  logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

  res.on('finish', () => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
  });
  next();
});

/** Parse the request */

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/** Rules of API */

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
    return res.status(200).json({});
  }
  next();
});

/** Serve Client */
router.use(express.static(path.join(__dirname, 'client/build')));
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

/** Routes */
router.use('/users', userRoutes);

/** Error Handling */

router.use((req, res, next) => {
  const error = new Error('not found');
  return res.status(404).json({
    message: error.message
  });
});

httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`));
