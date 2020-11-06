import express from 'express';
//import * as mongoose from 'mongoose';
const mongoose = require('mongoose')

//import * as express from 'express'
//var express = require('express');
////import * as express from 'express';
import * as bodyParser from 'body-parser';
//import config from './config';
import config_db from './config';

import Controller from './interfaces/controller.interface';
import loggerMiddleware from './middleware/logger.middleware';

/*
class App {
  public express
  constructor () {
    this.express = express()
    this.mountRoutes()
  }
  private mountRoutes (): void {
    const router = express.Router()
    //routes 
    const bookRoutes = require('./src/api/routes/books.routes');

    router.get('/', (req, res) => {
      res.json({
        message: 'Hello World!'
      })
    })
    this.express.use('/', router)
  }
}
export default new App().express
*/



class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();

    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  public listen(port: Number) {
    this.app.listen(port, () => {
      console.log(`App listening on the port ${port}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));
    this.app.use(loggerMiddleware);
    //this.app.use(bodyParser.json());

    //this.app.use(cookieParser());
  }

  private initializeErrorHandling() {
    //this.app.use(errorMiddleware);
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  private connectToTheDatabase() {
    //mongoose.connect('mongodb://'+config_db.+':'+config_db+'/'+config_db, {useNewUrlParser: true, useUnifiedTopology: true
    mongoose.connect('mongodb://localhost:27017/EtVSampleDB1', {useNewUrlParser: true, useUnifiedTopology: true
    }).then(() => {
      console.log('connected to db')
    }).catch((error: any) => {
      console.log(error)
    })
  }

  /*private connectToTheDatabase() {
    const {
      MONGO_USER,
      MONGO_PASSWORD,
      MONGO_PATH,
    } = process.env;
    mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`, {useNewUrlParser: true, useUnifiedTopology: true
    }).then(() => {
      console.log('connected to db')
    }).catch((error: any) => {
      console.log(error)
    })
  }*/
}

export default App;
