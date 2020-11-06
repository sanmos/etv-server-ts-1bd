//import { NextFunction, Request } from 'express';
import * as express from 'express';

function loggerMiddleware(request: express.Request, response: express.Response, next: any) {
  console.log(`${request.method} ${request.path}`);
  next();
}

export default loggerMiddleware;
