/*import { WebSocketServer, WebSocket } from 'ws';
import { createServer } from 'http';
import { parse } from 'url';
import { Message } from '../utils/types/Message';
import app from 'next/app';

const handle = app.getRequestHandler();

const wss = new WebSocketServer({ port: 8080 });
// HTTP server setup goes here

app.prepare().then(() => {
  // 1. Création du serveur HTTP unique
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  });})

const start = (): void => {
  try {
    server.listen(4000, () => console.log('Server started on port 4000'));

    wss.on('connection', (ws) => {
      ws.on('error', console.error);

      ws.on('message', (msg, isBinary) => {
        const msgAsString = msg.toString('utf-8');
        const msgObject = JSON.parse(msgAsString) as Message;
        insertMessage(msgObject, { db }).catch((e) => console.error(e));

        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(msgAsString, { binary: isBinary });
          }
        });
      });
    });

    wss.on('close', () => console.log('Connection closed'));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

wss.on('close', () => console.log('Connection closed'));

void start();

function insertMessage(msgObject: Message, arg1: { db: any; }) {
  throw new Error('Function not implemented.');
}*/
