import "regenerator-runtime/runtime";
import express from 'express';
import expressStaticGzip from 'express-static-gzip';
import cors from 'cors'
import bodyParser  from 'body-parser';
import { Server } from 'http';
import * as WebSocket from 'ws';
import socketRouter from './routes/socket';

const app = express();
const server = Server(app);
const wss = new WebSocket.Server({ server });
wss.on('connection', socketRouter);

if(process.env.NODE_ENV === 'development'){
  app.use(cors({credentials: true, origin: 'http://localhost:8080'}));
}

if(process.env.NODE_ENV === 'production') {
  const render = require('./render').default
  app.use(
    //'/assets',
    expressStaticGzip('dist', {
  		enableBrotli: true,
  	})
  );

  app.use('*', render);
}

server.listen(PORT, () => console.log('Demo app listening on port '+PORT));
