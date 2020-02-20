import express from 'express';
import http from 'http';
import path from 'path';
import WebSocket from 'ws';
import config from './config';

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const welcomeMsg = {
  type: 'message',
  text: 'Welcome to the Chat!',
};
const colors = ['rgb(185, 154, 255)', 'rgb(45, 162, 187)', 'rgb(251, 233, 131)', 'rgb(227, 215, 255)'];
const pool = [];
const users = {};

app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, '.' , '/public'));
});

wss.on('connection', (ws, request, client) => {

  pool.push( ws );

  ws.on('message', message => {

    console.log(`received : ${ message }`);
    wss.clients.forEach( client => {
      const
        parsedMsg = JSON.parse(message),
        { user , text } = parsedMsg
        ;
      users[user] = ws;
      const named = Object.keys(users)[pool.indexOf(ws)];
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({text: text, user: named, color: colors[pool.indexOf(ws)]}));
      }
    });
  });
  ws.send(JSON.stringify( welcomeMsg ));

  ws.on('close', function close() {
    const x = pool.indexOf(ws);
    const client = Object.keys(users)[x];
    pool.splice(x,1);
    delete users[client];
    console.log('client disconnected')
  })
  ;
});

app.use(express.static('public'));

server.listen(config.port, config.host, () => {
  console.log(`listening on port ${ config.port }`);
});
