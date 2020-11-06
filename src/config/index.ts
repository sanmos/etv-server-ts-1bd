//import dotenv from 'dotenv/types';
import dotenv from 'dotenv';

// Mapper for environment variables
// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export const config_server = {
  port: parseInt(<string>process.env.PORT, 10) || 3000
};

export const config_db = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  name: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_USER_PWD
};

export const corsUrl = process.env.CORS_URL;

export const config_token = {
  /*accessTokenValidityDays: parseInt(<string>process.env.ACCESS_TOKEN_VALIDITY_DAYS),
  refreshTokenValidityDays: parseInt(<string>process.env.REFRESH_TOKEN_VALIDITY_DAYS),
  issuer: process.env.TOKEN_ISSUER,
  audience: process.env.TOKEN_AUDIENCE,*/
  secret: process.env.JWT_SECRET
};

export const config_logging = {
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
    logDirectory: process.env.LOG_DIR
  },
};

////export const logDirectory = process.env.LOG_DIR;


export default {

  secret: process.env.JWT_SECRET

  /**
   * Your favorite port
   */
    ////port: parseInt(<string>process.env.PORT, 10) || 3000,

  /**
   * That long string from mlab
   */
  ////databaseURL: process.env.MONGODB_URI,

  /**
   * Your secret sauce
   */
  ////jwtSecret: process.env.JWT_SECRET,
  ////jwtAlgorithm: process.env.JWT_ALGO,

  /**
   * Used by winston logger
   */
  ////logs: {
    ////level: process.env.LOG_LEVEL || 'silly',
  ////},

  /**
   * Agenda.js stuff
   */
  ////agenda: {
    ////dbCollection: process.env.AGENDA_DB_COLLECTION,
    ////pooltime: process.env.AGENDA_POOL_TIME,
    //concurrency: parseInt(process.env.AGENDA_CONCURRENCY, 10),
  ////},

  /**
   * Agendash config
   */
  ////agendash: {
    ////user: 'agendash',
    ////password: '123456'
  ////},
  /**
   * API configs
   */
  ////api: {
    ////prefix: '/api',
  ////},
  /**
   * Mailgun email credentials
   */
  ////emails: {
    ////apiKey: process.env.MAILGUN_API_KEY,
    ////domain: process.env.MAILGUN_DOMAIN
  ////}
};