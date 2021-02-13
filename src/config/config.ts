import dotenv from 'dotenv';
dotenv.config();

const MONGO_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  socketTimeoutMS: 30000,
  keepAlive: true,
  poolSize: 50,
  autoIndex: true,
  retryWrites: false,
  useCreateIndex: true
};

const MONGO_URI = process.env.MONGO_URI || ``;

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || '';
const SERVER_PORT = process.env.SERVER_PORT || 1337;
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 3600;
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || '';
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || '';

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
  token: {
    expireTime: SERVER_TOKEN_EXPIRETIME,
    issuer: SERVER_TOKEN_ISSUER,
    secret: SERVER_TOKEN_SECRET
  }
};

const config = {
  mongo: {
    uri: MONGO_URI,
    options: MONGO_OPTIONS
  },
  server: SERVER
};

export default config;
