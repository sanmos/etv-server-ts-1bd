//import app from './App'
//import config from './config';
import { config_server } from './config';

import Logger from './loaders/logger';
import App from './App';
import ProductController from './domain/product/product.controller';
/*const port = process.env.PORT || 3000

app.listen(port, (err) => {
  if (err) {
    return console.log(err)
  }

  return console.log(`server is listening on ${port}`)
})*/

//const { port } = require('./config/index');

// start the server on port 3000
/*const server = app.listen(port, () => {
    console.log(`Express running → PORT ${server.address().port}`);
  })*/

  const app = new App(
    [
      new ProductController()
    ],
  );
  
  app.listen(config_server.port);
  

  /*app.listen(config_server.port, () => {
    Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config_server.port} 🛡️
      ################################################
    `);
  }).on('error', err => {
    Logger.error(err);
    process.exit(1);
  });*/




/*
// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );*/