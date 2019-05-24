import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import { onClientConnect } from './clientWSListener';

const app = express();

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on('connection', onClientConnect);

const port = process.env.PORT || 8999;
//start our server
server.listen(port, () => {
    console.log(`Server started on port ${port} :)`);
});
